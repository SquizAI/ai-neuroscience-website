import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const NeuralNetworkAnimation = () => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.clientWidth;
    const height = canvas.height = canvas.clientHeight;
    
    // Neural network parameters
    const layers = [6, 10, 8, 4]; // Number of neurons per layer
    const neurons = [];
    const connections = [];
    const activeConnections = new Set();
    
    // Initialize neurons
    let xOffset = width / (layers.length + 1);
    for (let l = 0; l < layers.length; l++) {
      const layerSize = layers[l];
      const yOffset = height / (layerSize + 1);
      
      for (let n = 0; n < layerSize; n++) {
        neurons.push({
          x: xOffset * (l + 1),
          y: yOffset * (n + 1),
          layer: l,
          index: n,
          size: 5 + Math.random() * 3,
          color: l === 0 ? '#4dabf7' : l === layers.length - 1 ? '#4c6ef5' : '#228be6',
          active: false,
          lastActive: 0,
          pulseValue: 0
        });
      }
    }
    
    // Create connections between neurons in adjacent layers
    for (let l = 0; l < layers.length - 1; l++) {
      const layer1Start = neurons.findIndex(n => n.layer === l);
      const layer2Start = neurons.findIndex(n => n.layer === l + 1);
      
      for (let i = 0; i < layers[l]; i++) {
        for (let j = 0; j < layers[l + 1]; j++) {
          connections.push({
            from: layer1Start + i,
            to: layer2Start + j,
            weight: Math.random(),
            color: `rgba(150, 175, 255, ${Math.random() * 0.4 + 0.1})`,
            width: Math.random() * 1 + 0.5,
            active: false,
            pulsePosition: 0,
            pulseValue: 0,
            speed: Math.random() * 0.02 + 0.01
          });
        }
      }
    }

    // Animation logic
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Random neuron activation in input layer to simulate data flow
      if (Math.random() < 0.05) {
        const inputLayerStart = 0;
        const randomInputNeuron = inputLayerStart + Math.floor(Math.random() * layers[0]);
        neurons[randomInputNeuron].active = true;
        neurons[randomInputNeuron].lastActive = Date.now();
        neurons[randomInputNeuron].pulseValue = 1;
        
        // Activate connections from this input neuron
        connections.forEach((conn, idx) => {
          if (conn.from === randomInputNeuron) {
            conn.active = true;
            conn.pulsePosition = 0;
            activeConnections.add(idx);
          }
        });
      }
      
      // Draw connections
      connections.forEach((conn, idx) => {
        const fromNeuron = neurons[conn.from];
        const toNeuron = neurons[conn.to];
        
        ctx.strokeStyle = conn.active ? 
          `rgba(100, 180, 255, ${0.2 + conn.pulseValue * 0.8})` : 
          conn.color;
          
        ctx.lineWidth = conn.active ? 
          conn.width + conn.pulseValue * 2 : 
          conn.width;
          
        ctx.beginPath();
        ctx.moveTo(fromNeuron.x, fromNeuron.y);
        ctx.lineTo(toNeuron.x, toNeuron.y);
        ctx.stroke();
        
        // Draw pulse along active connections
        if (activeConnections.has(idx)) {
          const pulseX = fromNeuron.x + (toNeuron.x - fromNeuron.x) * conn.pulsePosition;
          const pulseY = fromNeuron.y + (toNeuron.y - fromNeuron.y) * conn.pulsePosition;
          
          const gradient = ctx.createRadialGradient(
            pulseX, pulseY, 0,
            pulseX, pulseY, 10
          );
          gradient.addColorStop(0, 'rgba(120, 210, 255, 0.8)');
          gradient.addColorStop(1, 'rgba(120, 210, 255, 0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 10, 0, Math.PI * 2);
          ctx.fill();
          
          // Update pulse position
          conn.pulsePosition += conn.speed;
          
          // When pulse reaches end, activate the target neuron
          if (conn.pulsePosition >= 1) {
            neurons[conn.to].active = true;
            neurons[conn.to].lastActive = Date.now();
            neurons[conn.to].pulseValue = 1;
            
            activeConnections.delete(idx);
            conn.active = false;
            
            // Propagate activation to next layer
            if (toNeuron.layer < layers.length - 1) {
              connections.forEach((nextConn, nextIdx) => {
                if (nextConn.from === conn.to && Math.random() < 0.7) {
                  nextConn.active = true;
                  nextConn.pulsePosition = 0;
                  activeConnections.add(nextIdx);
                }
              });
            }
          }
        }
      });
      
      // Draw neurons
      neurons.forEach(neuron => {
        // Neuron glow effect
        if (neuron.active) {
          const gradient = ctx.createRadialGradient(
            neuron.x, neuron.y, 0,
            neuron.x, neuron.y, neuron.size * 3
          );
          gradient.addColorStop(0, `rgba(130, 200, 255, ${neuron.pulseValue * 0.7})`);
          gradient.addColorStop(1, 'rgba(130, 200, 255, 0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(neuron.x, neuron.y, neuron.size * 3, 0, Math.PI * 2);
          ctx.fill();
          
          // Decrease pulse value over time
          neuron.pulseValue -= 0.02;
          if (neuron.pulseValue <= 0) {
            neuron.active = false;
            neuron.pulseValue = 0;
          }
        }
        
        // Neuron body
        ctx.shadowBlur = neuron.active ? 15 : 0;
        ctx.shadowColor = '#64b5f6';
        
        const innerColor = neuron.active ? 
          '#90caf9' : 
          neuron.color;
        
        ctx.fillStyle = innerColor;
        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, neuron.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 0;
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <motion.div 
      className="relative w-full rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-gray-900 to-gray-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="absolute inset-0 bg-blue-500 opacity-5"></div>
      <div className="p-4 bg-opacity-90 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <h3 className="text-xl font-bold">Neural Network Activity</h3>
        <p className="text-sm opacity-80">Watch information flow through neural pathways</p>
      </div>
      <canvas 
        ref={canvasRef} 
        className="w-full h-[400px]"
        style={{ background: 'transparent' }}
      />
      <div className="p-3 bg-gray-800 bg-opacity-80 flex justify-between items-center text-xs text-gray-300">
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-blue-400 mr-2"></span>
          <span>Input Neurons</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-blue-600 mr-2"></span>
          <span>Hidden Layers</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-indigo-500 mr-2"></span>
          <span>Output Neurons</span>
        </div>
      </div>
    </motion.div>
  );
};

export default NeuralNetworkAnimation;
