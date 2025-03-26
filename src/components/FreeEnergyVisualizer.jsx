import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FreeEnergyVisualizer = () => {
  const canvasRef = useRef(null);
  const [mode, setMode] = useState('perception'); // 'perception' or 'action'
  const animationFrameRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    // Agent parameters
    const agent = {
      x: canvas.width * 0.5,
      y: canvas.height * 0.5,
      size: 15,
      angle: 0,
      speed: 2,
      predictionError: 0,
      prediction: { x: 0, y: 0 },
      target: { x: 0, y: 0 },
      trail: [],
      freeEnergy: 100,
      maxTrailLength: 50,
    };
    
    // Environment setup
    const environment = {
      obstacles: Array(10).fill().map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 15 + Math.random() * 20,
      })),
      goals: Array(3).fill().map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 10,
        value: Math.random() * 10 + 5,
      })),
      noiseLevel: 0.2,
    };
    
    // Set initial target for agent
    agent.target = {
      x: environment.goals[0].x,
      y: environment.goals[0].y,
    };
    
    // Animation variables
    let time = 0;
    const initialFreeEnergy = agent.freeEnergy;
    const predictionLines = [];
    
    const animate = () => {
      time += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid background for depth
      drawGrid(ctx, canvas.width, canvas.height);
      
      // Draw target with a pulsing animation
      const currentGoal = getCurrentGoal();
      drawGoal(ctx, currentGoal, time);
      
      // Update agent behavior based on mode
      if (mode === 'perception') {
        // In perception mode, the agent updates its internal model
        updatePerception(agent, environment, time);
      } else {
        // In action mode, the agent acts to match sensory data to predictions
        updateAction(agent, environment, time);
      }
      
      // Draw environment obstacles with neural-inspired visuals
      drawObstacles(ctx, environment.obstacles);
      
      // Draw environment goals
      environment.goals.forEach(goal => {
        drawGoal(ctx, goal, time);
      });
      
      // Draw agent trail (trace of past positions)
      drawAgentTrail(ctx, agent);
      
      // Draw agent and its predictions
      drawAgent(ctx, agent, time);
      
      // Draw prediction lines (agent's model of the world)
      updatePredictionLines(predictionLines, agent, environment);
      drawPredictionLines(ctx, predictionLines);
      
      // Draw free energy level indicator
      drawFreeEnergyMeter(ctx, agent.freeEnergy, initialFreeEnergy, canvas.width, canvas.height);
      
      // Draw explanatory text
      drawExplanation(ctx, mode, agent.freeEnergy, canvas.width, canvas.height);
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    const getCurrentGoal = () => {
      // Find the closest goal to the agent's target
      let minDist = Infinity;
      let closestGoal = environment.goals[0];
      
      environment.goals.forEach(goal => {
        const dist = Math.hypot(goal.x - agent.target.x, goal.y - agent.target.y);
        if (dist < minDist) {
          minDist = dist;
          closestGoal = goal;
        }
      });
      
      return closestGoal;
    };
    
    const updatePerception = (agent, environment, time) => {
      // Update prediction based on sensory data (with noise)
      const noise = environment.noiseLevel * (Math.random() * 2 - 1);
      const currentGoal = getCurrentGoal();
      
      // Agent tries to predict where the goal is
      agent.prediction = {
        x: currentGoal.x + Math.sin(time * 2) * 10 * noise,
        y: currentGoal.y + Math.cos(time * 3) * 10 * noise,
      };
      
      // Calculate prediction error
      agent.predictionError = Math.hypot(
        agent.prediction.x - currentGoal.x,
        agent.prediction.y - currentGoal.y
      );
      
      // Free energy decreases as prediction improves
      agent.freeEnergy = Math.max(0, agent.freeEnergy - 0.1 + agent.predictionError * 0.02);
      
      // Move agent slightly toward its prediction
      const dx = agent.prediction.x - agent.x;
      const dy = agent.prediction.y - agent.y;
      const dist = Math.hypot(dx, dy);
      
      if (dist > 1) {
        agent.angle = Math.atan2(dy, dx);
        agent.x += Math.cos(agent.angle) * agent.speed * 0.3;
        agent.y += Math.sin(agent.angle) * agent.speed * 0.3;
      }
      
      // Add current position to trail
      agent.trail.push({ x: agent.x, y: agent.y });
      if (agent.trail.length > agent.maxTrailLength) {
        agent.trail.shift();
      }
      
      // Check if agent reached any goal
      environment.goals.forEach(goal => {
        const distToGoal = Math.hypot(agent.x - goal.x, agent.y - goal.y);
        if (distToGoal < goal.radius + agent.size) {
          // Set new random target when a goal is reached
          const newGoalIndex = Math.floor(Math.random() * environment.goals.length);
          agent.target = {
            x: environment.goals[newGoalIndex].x,
            y: environment.goals[newGoalIndex].y,
          };
          // Reduce free energy when goal is reached
          agent.freeEnergy = Math.max(0, agent.freeEnergy - goal.value);
        }
      });
    };
    
    const updateAction = (agent, environment, time) => {
      // In action mode, the agent moves to minimize prediction error
      const currentGoal = getCurrentGoal();
      
      // Agent has a fixed prediction (its target)
      agent.prediction = {
        x: agent.target.x,
        y: agent.target.y,
      };
      
      // Calculate prediction error
      agent.predictionError = Math.hypot(
        agent.x - agent.prediction.x,
        agent.y - agent.prediction.y
      );
      
      // Move agent to reduce prediction error
      const dx = agent.prediction.x - agent.x;
      const dy = agent.prediction.y - agent.y;
      const dist = Math.hypot(dx, dy);
      
      if (dist > 1) {
        agent.angle = Math.atan2(dy, dx);
        
        // Check for obstacle avoidance
        let avoidanceX = 0;
        let avoidanceY = 0;
        
        environment.obstacles.forEach(obstacle => {
          const obstacleDistX = agent.x - obstacle.x;
          const obstacleDistY = agent.y - obstacle.y;
          const obstacleDist = Math.hypot(obstacleDistX, obstacleDistY);
          
          if (obstacleDist < obstacle.radius + agent.size * 2) {
            // Generate repulsive force
            const repulsiveFactor = 1 - Math.min(1, obstacleDist / (obstacle.radius + agent.size * 2));
            avoidanceX += obstacleDistX / obstacleDist * repulsiveFactor * 5;
            avoidanceY += obstacleDistY / obstacleDist * repulsiveFactor * 5;
          }
        });
        
        // Combine goal direction with obstacle avoidance
        const moveX = Math.cos(agent.angle) + avoidanceX;
        const moveY = Math.sin(agent.angle) + avoidanceY;
        const moveAngle = Math.atan2(moveY, moveX);
        
        agent.x += Math.cos(moveAngle) * agent.speed;
        agent.y += Math.sin(moveAngle) * agent.speed;
        
        // Increase free energy due to action
        agent.freeEnergy = Math.min(initialFreeEnergy, agent.freeEnergy + 0.05);
      }
      
      // Add current position to trail
      agent.trail.push({ x: agent.x, y: agent.y });
      if (agent.trail.length > agent.maxTrailLength) {
        agent.trail.shift();
      }
      
      // Check if agent reached goal
      const distToGoal = Math.hypot(agent.x - currentGoal.x, agent.y - currentGoal.y);
      if (distToGoal < currentGoal.radius + agent.size) {
        // Set new random target
        const newGoalIndex = Math.floor(Math.random() * environment.goals.length);
        agent.target = {
          x: environment.goals[newGoalIndex].x,
          y: environment.goals[newGoalIndex].y,
        };
        // Reduce free energy drastically when goal is reached
        agent.freeEnergy = Math.max(0, agent.freeEnergy - currentGoal.value * 2);
      }
    };
    
    const drawGrid = (ctx, width, height) => {
      ctx.strokeStyle = 'rgba(180, 180, 255, 0.1)';
      ctx.lineWidth = 0.5;
      
      const gridSize = 30;
      
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };
    
    const drawAgentTrail = (ctx, agent) => {
      if (agent.trail.length < 2) return;
      
      ctx.beginPath();
      ctx.moveTo(agent.trail[0].x, agent.trail[0].y);
      
      for (let i = 1; i < agent.trail.length; i++) {
        ctx.lineTo(agent.trail[i].x, agent.trail[i].y);
      }
      
      ctx.strokeStyle = `rgba(100, 200, 255, 0.3)`;
      ctx.lineWidth = 2;
      ctx.stroke();
    };
    
    const drawAgent = (ctx, agent, time) => {
      // Draw agent body (circular with directional indicator)
      ctx.beginPath();
      ctx.arc(agent.x, agent.y, agent.size, 0, Math.PI * 2);
      
      // Gradient fill for agent body
      const gradient = ctx.createRadialGradient(
        agent.x, agent.y, 0,
        agent.x, agent.y, agent.size
      );
      
      // Color based on prediction error
      const errorFactor = Math.min(1, agent.predictionError / 50);
      const r = 50 + errorFactor * 200;
      const g = 120 + (1 - errorFactor) * 100;
      const b = 200;
      
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.9)`);
      gradient.addColorStop(1, `rgba(${r * 0.7}, ${g * 0.7}, ${b}, 0.7)`);
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Draw direction indicator
      ctx.beginPath();
      ctx.moveTo(
        agent.x + Math.cos(agent.angle) * agent.size,
        agent.y + Math.sin(agent.angle) * agent.size
      );
      ctx.lineTo(
        agent.x + Math.cos(agent.angle) * agent.size * 1.5,
        agent.y + Math.sin(agent.angle) * agent.size * 1.5
      );
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw prediction visualization (where agent thinks the target is)
      ctx.beginPath();
      ctx.arc(
        agent.prediction.x,
        agent.prediction.y,
        5 + Math.sin(time * 5) * 2,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = `rgba(255, 220, 100, ${0.5 + Math.sin(time * 5) * 0.2})`;
      ctx.fill();
      
      // Draw line from agent to its prediction
      ctx.beginPath();
      ctx.moveTo(agent.x, agent.y);
      ctx.lineTo(agent.prediction.x, agent.prediction.y);
      ctx.strokeStyle = `rgba(255, 220, 100, ${0.3 + Math.sin(time * 5) * 0.1})`;
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);
    };
    
    const drawObstacles = (ctx, obstacles) => {
      obstacles.forEach(obstacle => {
        // Neural-inspired obstacle visualization
        ctx.beginPath();
        ctx.arc(obstacle.x, obstacle.y, obstacle.radius, 0, Math.PI * 2);
        
        // Create gradient fill
        const gradient = ctx.createRadialGradient(
          obstacle.x, obstacle.y, 0,
          obstacle.x, obstacle.y, obstacle.radius
        );
        gradient.addColorStop(0, 'rgba(80, 30, 120, 0.7)');
        gradient.addColorStop(0.7, 'rgba(80, 30, 120, 0.5)');
        gradient.addColorStop(1, 'rgba(80, 30, 120, 0.1)');
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Add "dendrite" lines around obstacles
        const numLines = Math.floor(obstacle.radius / 2);
        for (let i = 0; i < numLines; i++) {
          const angle = (i / numLines) * Math.PI * 2;
          const length = obstacle.radius * 0.5 + Math.random() * obstacle.radius * 0.5;
          
          ctx.beginPath();
          ctx.moveTo(
            obstacle.x + Math.cos(angle) * obstacle.radius * 0.9,
            obstacle.y + Math.sin(angle) * obstacle.radius * 0.9
          );
          ctx.lineTo(
            obstacle.x + Math.cos(angle) * (obstacle.radius + length),
            obstacle.y + Math.sin(angle) * (obstacle.radius + length)
          );
          
          ctx.strokeStyle = 'rgba(120, 50, 180, 0.3)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
    };
    
    const drawGoal = (ctx, goal, time) => {
      // Pulsing animation for goals
      const pulseSize = goal.radius + Math.sin(time * 3) * 2;
      
      // Outer glow
      ctx.beginPath();
      ctx.arc(goal.x, goal.y, pulseSize * 1.5, 0, Math.PI * 2);
      const glowGradient = ctx.createRadialGradient(
        goal.x, goal.y, 0,
        goal.x, goal.y, pulseSize * 1.5
      );
      glowGradient.addColorStop(0, 'rgba(0, 220, 180, 0.2)');
      glowGradient.addColorStop(1, 'rgba(0, 220, 180, 0)');
      ctx.fillStyle = glowGradient;
      ctx.fill();
      
      // Inner circle
      ctx.beginPath();
      ctx.arc(goal.x, goal.y, pulseSize, 0, Math.PI * 2);
      
      // Create gradient fill
      const gradient = ctx.createRadialGradient(
        goal.x, goal.y, 0,
        goal.x, goal.y, pulseSize
      );
      gradient.addColorStop(0, 'rgba(0, 255, 200, 0.9)');
      gradient.addColorStop(1, 'rgba(0, 200, 170, 0.7)');
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Value indicator (size)
      ctx.font = '10px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText(goal.value.toFixed(1), goal.x, goal.y + 3);
    };
    
    const updatePredictionLines = (predictionLines, agent, environment) => {
      // Update or create new prediction lines
      if (predictionLines.length < 20) {
        // Create new prediction line
        predictionLines.push({
          x1: agent.x,
          y1: agent.y,
          x2: agent.x + (Math.random() * 100 - 50),
          y2: agent.y + (Math.random() * 100 - 50),
          opacity: Math.random() * 0.3 + 0.1,
          width: Math.random() * 1 + 0.5,
          speed: Math.random() * 0.02 + 0.01,
          life: 1
        });
      }
      
      // Update existing prediction lines
      for (let i = predictionLines.length - 1; i >= 0; i--) {
        const line = predictionLines[i];
        
        // Move end of line towards a random goal or the agent's prediction
        const targetGoalIndex = Math.floor(Math.random() * environment.goals.length);
        const targetX = Math.random() < 0.7 ? agent.prediction.x : environment.goals[targetGoalIndex].x;
        const targetY = Math.random() < 0.7 ? agent.prediction.y : environment.goals[targetGoalIndex].y;
        
        line.x2 += (targetX - line.x2) * line.speed;
        line.y2 += (targetY - line.y2) * line.speed;
        
        // Move start of line towards agent
        line.x1 += (agent.x - line.x1) * line.speed * 2;
        line.y1 += (agent.y - line.y1) * line.speed * 2;
        
        // Reduce life of line
        line.life -= 0.005;
        
        // Remove dead lines
        if (line.life <= 0) {
          predictionLines.splice(i, 1);
        }
      }
    };
    
    const drawPredictionLines = (ctx, predictionLines) => {
      // Draw prediction lines
      predictionLines.forEach(line => {
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.strokeStyle = `rgba(255, 220, 100, ${line.opacity * line.life})`;
        ctx.lineWidth = line.width * line.life;
        ctx.stroke();
      });
    };
    
    const drawFreeEnergyMeter = (ctx, freeEnergy, maxEnergy, width, height) => {
      const meterWidth = 200;
      const meterHeight = 15;
      const x = width - meterWidth - 20;
      const y = 20;
      
      // Draw background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(x, y, meterWidth, meterHeight);
      
      // Draw energy level
      const energyRatio = freeEnergy / maxEnergy;
      const barWidth = meterWidth * energyRatio;
      
      // Gradient from green (low) to red (high free energy)
      const gradient = ctx.createLinearGradient(x, y, x + meterWidth, y);
      gradient.addColorStop(0, '#00c853');
      gradient.addColorStop(0.5, '#ffeb3b');
      gradient.addColorStop(1, '#f44336');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth, meterHeight);
      
      // Draw border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, meterWidth, meterHeight);
      
      // Draw label
      ctx.font = '12px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'left';
      ctx.fillText('Free Energy', x, y - 5);
    };
    
    const drawExplanation = (ctx, mode, freeEnergy, width, height) => {
      const x = 20;
      const y = height - 20;
      
      ctx.font = '12px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.textAlign = 'left';
      
      if (mode === 'perception') {
        ctx.fillText('Perception Mode: Agent is updating its internal model to match sensory data', x, y);
      } else {
        ctx.fillText('Action Mode: Agent is acting to make sensory data match its predictions', x, y);
      }
      
      ctx.fillText(`Current Free Energy: ${freeEnergy.toFixed(1)}`, x, y - 20);
    };
    
    animate();
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mode]);
  
  return (
    <motion.div 
      className="rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-gray-900 to-indigo-900"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="p-4 bg-gradient-to-r from-indigo-800 to-purple-800 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-white">Free Energy Principle Visualization</h3>
          <p className="text-xs text-indigo-200">Karl Friston's unified brain theory in action</p>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => setMode('perception')}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              mode === 'perception' 
                ? 'bg-white text-indigo-900 font-medium' 
                : 'bg-indigo-700 text-white'
            }`}
          >
            Perception
          </button>
          <button 
            onClick={() => setMode('action')}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              mode === 'action' 
                ? 'bg-white text-indigo-900 font-medium' 
                : 'bg-indigo-700 text-white'
            }`}
          >
            Action
          </button>
        </div>
      </div>
      
      <div className="relative">
        <canvas 
          ref={canvasRef} 
          className="w-full h-[400px]"
        />
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
          <p className="text-white text-xs leading-tight max-w-md">
            {mode === 'perception' 
              ? 'The brain updates its internal model to minimize prediction errors (perception).'
              : 'The brain acts on the environment to make sensory data match predictions (action).'}
            <br/>
            <span className="text-indigo-300">Free energy is the sum of surprisal and complexity cost.</span>
          </p>
        </div>
      </div>
      
      <div className="p-3 bg-indigo-900 grid grid-cols-3 gap-2 text-xs">
        <div className="flex flex-col items-center">
          <span className="w-3 h-3 rounded-full bg-blue-400 mb-1"></span>
          <span className="text-blue-200">Agent</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="w-3 h-3 rounded-full bg-purple-700 mb-1"></span>
          <span className="text-blue-200">Obstacles</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="w-3 h-3 rounded-full bg-green-400 mb-1"></span>
          <span className="text-blue-200">Goals</span>
        </div>
      </div>
    </motion.div>
  );
};

export default FreeEnergyVisualizer;
