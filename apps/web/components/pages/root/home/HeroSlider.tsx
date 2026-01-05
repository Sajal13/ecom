
import { getProducts } from 'actions/products'
import React from 'react'


const HeroSlider = async () => {
  const data  = await getProducts({ limit: 10}); 

  console.log(data);
  return (
    <div>HeroSlider</div>
  )
}

export default HeroSlider