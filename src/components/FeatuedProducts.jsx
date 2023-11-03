import React from 'react'
import SectionTitle from './SectionTitle'
import ProductsGrid from './ProductsGrid'

const FeatuedProducts = () => {

  return (
    <div className='pt-24 '>
      <SectionTitle text='featured products' />
      <ProductsGrid />
    </div>
  );
}

export default FeatuedProducts