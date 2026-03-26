import React from 'react';

const Skeleton = () => {
  return (
    <div className="container px-6 flex gap-3 items-center h-14 overflow-hidden">
      {Array.from({ length: 16 }).map((_, index) => (
        <div
          key={index}
          className="w-28 h-4 bg-neutral-200 rounded-md animate-pulse"
        ></div>
      ))}
    </div>
  );
};

export default Skeleton;
