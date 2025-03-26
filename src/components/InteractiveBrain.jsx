import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const InteractiveBrain = ({ highlightRegion = null }) => {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const brainRef = useRef(null);
  const controlsRef = useRef(null);
  const neuronParticlesRef = useRef(null);
  const neuronLinesRef = useRef(null);

  useEffect(() => {
    // Initialize Three.js scene
    const width = mountRef.current.clientWidth;
    const height = 500;
    
    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xf5f9ff);
    
    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    cameraRef.current = camera;
    camera.position.z = 8;
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);

    // Create brain mesh
    createBrain();
    
    // Create neural network visualization
    createNeuralNetwork();
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (brainRef.current) {
        brainRef.current.rotation.y += 0.001;
      }
      
      if (neuronParticlesRef.current) {
        neuronParticlesRef.current.rotation.y += 0.0005;
      }
      
      if (neuronLinesRef.current) {
        const positions = neuronLinesRef.current.geometry.attributes.position;
        const count = positions.count;
        
        for (let i = 0; i < count; i++) {
          const y = positions.getY(i);
          positions.setY(i, y + Math.sin(Date.now() * 0.001 + i) * 0.001);
        }
        
        positions.needsUpdate = true;
      }
      
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      const width = mountRef.current.clientWidth;
      
      if (cameraRef.current) {
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
      }
      
      if (rendererRef.current) {
        rendererRef.current.setSize(width, height);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
    };
  }, []);
  
  useEffect(() => {
    if (highlightRegion && brainRef.current) {
      highlightBrainRegion(highlightRegion);
    }
  }, [highlightRegion]);
  
  const createBrain = () => {
    // Create a brain-like structure using spherical harmonics
    const geometry = new THREE.SphereGeometry(3, 64, 64);
    
    // Distort the sphere to look more brain-like
    const positionAttribute = geometry.attributes.position;
    const vertex = new THREE.Vector3();
    
    for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i);
      
      // Apply deformation using simplex noise approximation
      const scale = 0.2;
      const noise = Math.sin(vertex.x * 2) * Math.cos(vertex.y * 3) * Math.sin(vertex.z * 2.5) * scale;
      vertex.addScaledVector(vertex.clone().normalize(), noise);
      
      // Apply frontal lobe asymmetry
      if (vertex.z > 0) {
        vertex.x *= 1.1;
      }
      
      positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    
    geometry.computeVertexNormals();
    
    // Create a material that resembles brain tissue with subsurface scattering
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xf5d0c9,
      metalness: 0.1,
      roughness: 0.7,
      clearcoat: 0.4,
      clearcoatRoughness: 0.25,
      transmission: 0.1,
      thickness: 1.0,
    });
    
    const brain = new THREE.Mesh(geometry, material);
    brainRef.current = brain;
    sceneRef.current.add(brain);
    
    // Add sulci (brain wrinkles) using line segments
    const sulciMaterial = new THREE.LineBasicMaterial({ color: 0xd3a8a1, transparent: true, opacity: 0.5 });
    const sulciCount = 100;
    
    for (let i = 0; i < sulciCount; i++) {
      const points = [];
      const startTheta = Math.random() * Math.PI * 2;
      const startPhi = Math.random() * Math.PI;
      const radius = 3.05;
      
      const x1 = radius * Math.sin(startPhi) * Math.cos(startTheta);
      const y1 = radius * Math.sin(startPhi) * Math.sin(startTheta);
      const z1 = radius * Math.cos(startPhi);
      
      points.push(new THREE.Vector3(x1, y1, z1));
      
      // Create a curved sulcus
      const length = 0.5 + Math.random() * 1.0;
      const segments = 10;
      
      for (let j = 1; j <= segments; j++) {
        const t = j / segments;
        const offset = new THREE.Vector3(
          Math.sin(t * Math.PI * 2) * 0.1,
          Math.cos(t * Math.PI * 3) * 0.1,
          Math.sin(t * Math.PI * 2.5) * 0.1
        );
        
        const x = x1 + (Math.random() - 0.5) * length + offset.x;
        const y = y1 + (Math.random() - 0.5) * length + offset.y;
        const z = z1 + (Math.random() - 0.5) * length + offset.z;
        
        points.push(new THREE.Vector3(x, y, z));
      }
      
      const sulcusGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const sulcus = new THREE.Line(sulcusGeometry, sulciMaterial);
      sceneRef.current.add(sulcus);
    }
  };
  
  const createNeuralNetwork = () => {
    // Create neurons as particles
    const particleCount = 300;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    const particleColors = new Float32Array(particleCount * 3);
    
    const neuronPositions = [];
    
    for (let i = 0; i < particleCount; i++) {
      // Create particles in spherical coordinates with noise to form a brain-like shape
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 2.5 + (Math.random() - 0.5) * 0.8;
      
      // Convert to cartesian coordinates
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;
      
      neuronPositions.push(new THREE.Vector3(x, y, z));
      
      // Vary particle sizes
      particleSizes[i] = Math.random() * 0.05 + 0.02;
      
      // Blue to purple gradient for neurons
      particleColors[i * 3] = 0.3 + Math.random() * 0.3;     // R: 0.3-0.6
      particleColors[i * 3 + 1] = 0.2 + Math.random() * 0.3; // G: 0.2-0.5
      particleColors[i * 3 + 2] = 0.8 + Math.random() * 0.2; // B: 0.8-1.0
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    neuronParticlesRef.current = particles;
    sceneRef.current.add(particles);
    
    // Create neural connections as lines
    const connectionCount = 200;
    const linePositions = new Float32Array(connectionCount * 6); // 2 points per line (x,y,z) * 2
    const lineColors = new Float32Array(connectionCount * 6); // RGB for each point
    
    for (let i = 0; i < connectionCount; i++) {
      // Randomly connect neurons that are within a certain distance of each other
      const sourceIndex = Math.floor(Math.random() * neuronPositions.length);
      const source = neuronPositions[sourceIndex];
      
      // Find the closest neurons to connect to
      let target = null;
      let minDist = Infinity;
      
      for (let j = 0; j < neuronPositions.length; j++) {
        if (j !== sourceIndex) {
          const potentialTarget = neuronPositions[j];
          const dist = source.distanceTo(potentialTarget);
          
          if (dist < 1.5 && dist < minDist) {
            minDist = dist;
            target = potentialTarget;
          }
        }
      }
      
      if (target) {
        linePositions[i * 6] = source.x;
        linePositions[i * 6 + 1] = source.y;
        linePositions[i * 6 + 2] = source.z;
        linePositions[i * 6 + 3] = target.x;
        linePositions[i * 6 + 4] = target.y;
        linePositions[i * 6 + 5] = target.z;
        
        // Gradient color from source to target (purple-blue to cyan-teal)
        lineColors[i * 6] = 0.4;     // R
        lineColors[i * 6 + 1] = 0.2; // G
        lineColors[i * 6 + 2] = 0.8; // B
        
        lineColors[i * 6 + 3] = 0.0;     // R
        lineColors[i * 6 + 4] = 0.7; // G
        lineColors[i * 6 + 5] = 0.9; // B
      }
    }
    
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));
    
    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      linewidth: 1,
    });
    
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    neuronLinesRef.current = lines;
    sceneRef.current.add(lines);
  };
  
  const highlightBrainRegion = (region) => {
    // Add illumination to specific brain regions for educational purposes
    // This would be expanded in a real implementation to have anatomically correct brain regions
    const regions = {
      prefrontal: { x: 0, y: 0.8, z: 2.5, color: 0xff5500 },
      motor: { x: 0, y: 2, z: 1, color: 0x00ff00 },
      visual: { x: 0, y: -1, z: -2.5, color: 0x0055ff },
      temporal: { x: 2.5, y: 0, z: 0, color: 0xffff00 },
    };
    
    if (regions[region]) {
      const { x, y, z, color } = regions[region];
      
      // Create a spotlight to illuminate the region
      const spotlight = new THREE.SpotLight(color, 2);
      spotlight.position.set(x * 1.5, y * 1.5, z * 1.5);
      spotlight.target.position.set(x, y, z);
      spotlight.angle = 0.3;
      spotlight.penumbra = 0.2;
      spotlight.decay = 2;
      spotlight.distance = 10;
      
      sceneRef.current.add(spotlight);
      sceneRef.current.add(spotlight.target);
      
      // Animate camera to focus on the region
      const targetPosition = new THREE.Vector3(x, y, z).normalize().multiplyScalar(8);
      
      gsap.to(cameraRef.current.position, {
        x: targetPosition.x,
        y: targetPosition.y,
        z: targetPosition.z,
        duration: 1.5,
        ease: 'power2.inOut',
        onUpdate: () => {
          cameraRef.current.lookAt(0, 0, 0);
        }
      });
    }
  };

  return (
    <motion.div 
      className="relative bg-gray-50 rounded-xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="p-4 bg-gradient-to-r from-primary-700 to-primary-900 text-white">
        <h3 className="text-xl font-bold">Interactive 3D Brain Model</h3>
        <p className="text-sm opacity-80">Explore brain regions related to AI principles</p>
      </div>
      <div 
        ref={mountRef} 
        className="w-full h-[500px] bg-gradient-to-b from-gray-50 to-gray-100"
      />
      <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-2 bg-white">
        <button 
          onClick={() => highlightRegion('prefrontal')}
          className="px-3 py-2 text-xs bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          Prefrontal Cortex
        </button>
        <button 
          onClick={() => highlightRegion('motor')}
          className="px-3 py-2 text-xs bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          Motor Cortex
        </button>
        <button 
          onClick={() => highlightRegion('visual')}
          className="px-3 py-2 text-xs bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          Visual Cortex
        </button>
        <button 
          onClick={() => highlightRegion('temporal')}
          className="px-3 py-2 text-xs bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          Temporal Lobe
        </button>
      </div>
    </motion.div>
  );
};

export default InteractiveBrain;
