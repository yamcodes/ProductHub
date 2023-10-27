import { useContext } from 'react';
import AddProductContext from './add-product.context';

const useAddProduct = () => {
  const context = useContext(AddProductContext);

  if (context === undefined)
    throw new Error('useAddProduct must be used within a AddProductProvider');

  return context;
};

export default useAddProduct;
