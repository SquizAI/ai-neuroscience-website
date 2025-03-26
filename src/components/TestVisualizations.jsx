import React from 'react';
import InteractiveBrain from './InteractiveBrain';
import NeuralNetworkAnimation from './NeuralNetworkAnimation';
import FreeEnergyPrinciple from './FreeEnergyPrinciple';
import FreeEnergyVisualizer from './FreeEnergyVisualizer';
import ConsciousnessIntelligenceChart from './ConsciousnessIntelligenceChart';
import PredictionMechanismsComparison from './PredictionMechanismsComparison';
import ScalingLimitationsChart from './ScalingLimitationsChart';
import AIConceptMap from './AIConceptMap';
import AITimelineViz from './AITimelineViz';

const TestVisualizations = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Interactive Visualizations Test Page</h1>
      
      <div className="prose prose-lg max-w-none">
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-700">Interactive Visualizations Test</h2>
        <p className="text-gray-600 mb-6">This file tests the rendering of various interactive visualizations.</p>
        
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-700">Interactive Brain Model</h2>
        <p className="text-gray-600 mb-6">Below is an interactive 3D brain model that allows you to explore different brain regions:</p>
        <div className="my-8 rounded-lg shadow-lg overflow-hidden border border-blue-100">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 border-b flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-white">Interactive 3D Brain Model</h3>
              <p className="text-blue-100 text-sm">Explore brain regions related to AI principles</p>
            </div>
          </div>
          <div className="p-6 bg-white">
            <div className="h-[400px]">
              <InteractiveBrain />
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-700">Neural Network Animation</h2>
        <p className="text-gray-600 mb-6">This animation shows information flow in neural networks:</p>
        <div className="my-8 rounded-lg shadow-lg overflow-hidden border border-cyan-100">
          <div className="bg-gradient-to-r from-cyan-800 to-blue-800 p-4 border-b flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-white">Neural Network Dynamics</h3>
              <p className="text-cyan-100 text-sm">Watch information flow through neural pathways</p>
            </div>
          </div>
          <div className="p-6 bg-gray-900">
            <div className="h-[400px]">
              <NeuralNetworkAnimation />
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-700">Free Energy Principle Visualization</h2>
        <p className="text-gray-600 mb-6">Explore Friston's Free Energy Principle in action:</p>
        <div className="my-8 rounded-lg shadow-lg overflow-hidden border border-purple-100">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 border-b flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-white">Free Energy Principle Visualization</h3>
              <p className="text-purple-100 text-sm">Karl Friston's unified brain theory in action</p>
            </div>
          </div>
          <div className="p-6 bg-white">
            <FreeEnergyVisualizer />
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-700">Free Energy Principle Simulation</h2>
        <p className="text-gray-600 mb-6">Another view of the Free Energy Principle:</p>
        <div className="my-8 rounded-lg shadow-lg overflow-hidden border border-green-100">
          <div className="bg-gradient-to-r from-green-600 to-teal-600 p-4 border-b flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-white">Free Energy Principle</h3>
              <p className="text-green-100 text-sm">Interactive visualization of the Free Energy Principle</p>
            </div>
          </div>
          <div className="p-6 bg-white">
            <FreeEnergyPrinciple />
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-700">Consciousness vs Intelligence Matrix</h2>
        <p className="text-gray-600 mb-6">This chart explores the relationship between consciousness and intelligence:</p>
        <div className="my-8 rounded-lg shadow-lg overflow-hidden border border-pink-100">
          <div className="bg-gradient-to-r from-pink-600 to-rose-600 p-4 border-b flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-white">Consciousness & Intelligence</h3>
              <p className="text-pink-100 text-sm">Exploring the relationship between consciousness and intelligence</p>
            </div>
          </div>
          <div className="p-6 bg-white">
            <ConsciousnessIntelligenceChart />
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-700">Prediction Mechanisms Comparison</h2>
        <p className="text-gray-600 mb-6">Compare different predictive processing approaches:</p>
        <div className="my-8 rounded-lg shadow-lg overflow-hidden border border-amber-100">
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-4 border-b flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-white">Prediction Mechanisms</h3>
              <p className="text-amber-100 text-sm">Comparing prediction mechanisms in the brain and AI</p>
            </div>
          </div>
          <div className="p-6 bg-white">
            <PredictionMechanismsComparison />
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-700">Scaling Limitations Chart</h2>
        <p className="text-gray-600 mb-6">Visualize the limitations of scaling in current AI systems:</p>
        <div className="my-8 rounded-lg shadow-lg overflow-hidden border border-red-100">
          <div className="bg-gradient-to-r from-red-600 to-rose-600 p-4 border-b flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-white">Scaling Limitations</h3>
              <p className="text-red-100 text-sm">Exploring the limitations of scaling in AI systems</p>
            </div>
          </div>
          <div className="p-6 bg-white">
            <ScalingLimitationsChart />
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-700">AI Neuroscience Concept Map</h2>
        <p className="text-gray-600 mb-6">An interactive map of key concepts in AI neuroscience:</p>
        <div className="my-8 rounded-lg shadow-lg overflow-hidden border border-sky-100">
          <div className="bg-gradient-to-r from-sky-600 to-blue-600 p-4 border-b flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-white">AI Concept Map</h3>
              <p className="text-sky-100 text-sm">Interactive map of key AI concepts and their relationships</p>
            </div>
          </div>
          <div className="p-6 bg-white">
            <AIConceptMap />
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-700">AI Neuroscience Timeline</h2>
        <p className="text-gray-600 mb-6">Historical development of AI and neuroscience intersections:</p>
        <div className="my-8 rounded-lg shadow-lg overflow-hidden border border-emerald-100">
          <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-4 border-b flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-white">AI Development Timeline</h3>
              <p className="text-emerald-100 text-sm">Key milestones in the development of artificial intelligence</p>
            </div>
          </div>
          <div className="p-6 bg-white">
            <AITimelineViz />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestVisualizations;
