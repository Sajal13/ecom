'use client';

import React from 'react'
import Lottie from 'lottie-react'
import Loading_Cart from 'assets/json/shopping-cart-primary.json'
const LoadingAnimation = () => {
  return (
    <Lottie animationData={Loading_Cart} className='w-full h-full' />
  )
}

export default LoadingAnimation;