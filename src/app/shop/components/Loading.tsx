// src/components/Loading.tsx
'use client';
import React from 'react';

interface LoadingProps {
  size?: number; // in rem
  color?: string;
}

const Loading: React.FC<LoadingProps> = ({
  size = 5,
  color = 'border-t-orange-300',
}) => {
  return (
    <div
      className="flex justify-center items-center min-h-screen"
      role="status"
      aria-label="Loading..."
    >
      <div
        className={`animate-spin rounded-full border-4 border-gray-200 ${color}`}
        style={{
          width: `${size}rem`,
          height: `${size}rem`,
        }}
      />
    </div>
  );
};

export default Loading;
