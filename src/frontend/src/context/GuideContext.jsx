// frontend/src/context/GuideContext.jsx - Context para Guía Flotante Global
import React, { createContext, useContext, useState, useCallback } from 'react';

const GuideContext = createContext();

export function GuideProvider({ children }) {
  const [activeGuide, setActiveGuide] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isFloatingMode, setIsFloatingMode] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const startGuide = useCallback((guideId) => {
    setActiveGuide(guideId);
    setCurrentStep(0);
    setCompletedSteps([]);
    setIsFloatingMode(false);
    setIsMinimized(false);
  }, []);

  const activateFloatingMode = useCallback(() => {
    setIsFloatingMode(true);
  }, []);

  const closeGuide = useCallback(() => {
    setActiveGuide(null);
    setCurrentStep(0);
    setCompletedSteps([]);
    setIsFloatingMode(false);
    setIsMinimized(false);
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep(prev => prev + 1);
  }, []);

  const previousStep = useCallback(() => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  }, []);

  const markStepCompleted = useCallback((stepIndex) => {
    setCompletedSteps(prev => {
      if (!prev.includes(stepIndex)) {
        return [...prev, stepIndex];
      }
      return prev;
    });
  }, []);

  const toggleMinimize = useCallback(() => {
    setIsMinimized(prev => !prev);
  }, []);

  const value = {
    activeGuide,
    currentStep,
    completedSteps,
    isFloatingMode,
    isMinimized,
    startGuide,
    activateFloatingMode,
    closeGuide,
    nextStep,
    previousStep,
    markStepCompleted,
    toggleMinimize,
    setCurrentStep
  };

  return (
    <GuideContext.Provider value={value}>
      {children}
    </GuideContext.Provider>
  );
}

export function useGuide() {
  const context = useContext(GuideContext);
  if (!context) {
    throw new Error('useGuide must be used within a GuideProvider');
  }
  return context;
}
