import { useProducts } from '~/entities/products';
import { ReactNode } from 'react';
import AddProductContext from './add-product.context';

const AddProductProvider = ({ children }: { children: ReactNode }) => {
  const { createMutation } = useProducts();
  return (
    <AddProductContext.Provider value={createMutation}>
      {children}
    </AddProductContext.Provider>
  );
};

export default AddProductProvider;
