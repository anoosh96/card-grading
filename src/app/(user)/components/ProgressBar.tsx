// components/StepProgressBar.tsx
import React from 'react';
import { FaSpinner } from 'react-icons/fa';

interface StepProgressBarProps {
  currentStep: number; // 1-based index (1 = Card Details, 2 = Subscription, 3 = Tracking)
  className?: string;
  isSubmitted?: boolean;
  steps: string[]
}

const widths: {[key: number]: string} = {
  1: 'w-0',
  2: 'w-1/2',
  3: 'w-full'
} 

const StepProgressBar: React.FC<StepProgressBarProps> = ({ currentStep, className = '', isSubmitted = false, steps }) => {

  const getLoadingWidth = () => {
    return widths[currentStep]
  }

  return (
    <div className={`relative h-2 bg-transparent-red rounded-2xl w-full ${className}`}>
      <div className={`absolute h-2 top-0 transition-all duration-300 bg-light-red ${getLoadingWidth()}`}></div>
      <div className={`absolute -top-5 left-0 right-0 w-full flex justify-between`}>
        {
          steps.map((step, i) => {
            return (
              <div key={i} className={`flex flex-col gap-1 justify-center ${ i == 0 ? 'items-start' : i == 1 ? 'items-center' : 'items-end'}`}>
                <div className={`rounded-full ${i + 1 <= currentStep ? 'bg-light-red' : 'bg-transparent-red'} h-12 w-12 flex justify-center items-center`}>
                  {(i + 1 == currentStep && isSubmitted) ? (
                    <FaSpinner className="text-xl animate-spin" />
                  ) : (
                    <span className="text-lg text-white">{i + 1 <= currentStep ? i + 1 : ''}</span>
                  )}
                </div>
                <span className={`text-sm text-light-red text-center ${i == 0 ? '-ml-[10px]' : ''}`}>{step}</span>
             </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default StepProgressBar;