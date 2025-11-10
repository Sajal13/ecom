import React from 'react';
import LoadingAnimation from 'components/common/LoadingAnimation';

const Loading = () => {
  return (
    <div className='h-screen w-screen bg-neutral-50 flex justify-center items-center'>
      <div className='h-64 w-64'>
        <LoadingAnimation />
      </div>
    </div>
  )
}

export default Loading;