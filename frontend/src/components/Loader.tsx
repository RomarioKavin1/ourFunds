import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-t-4 border-white border-opacity-30 border-solid rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
