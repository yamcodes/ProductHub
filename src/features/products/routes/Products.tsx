import { AddProduct, useDeleteProducts } from '~/features/products';
import { GenerateProducts } from '~/features/products';
import { ProductsList } from '../components';

export function Products() {
  const { mutate } = useDeleteProducts();
  return (
    <div className="space-y-4">
      {/* Temporary delete all products button until we have a proper header for that */}
      <button className="btn btn-red mb-4" onClick={() => mutate()}>
        Delete All Products
      </button>
      <ProductsList />
      <div className="bg-#f9f9f9 border-#ddd border-1 rounded-md p-4">
        <AddProduct />
        <hr className="my-4" />
        <GenerateProducts />
      </div>
    </div>
  );
}
