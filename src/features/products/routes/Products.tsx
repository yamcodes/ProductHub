import { AddProduct } from '~/features/products';
import { GenerateProducts } from '~/features/products';
import { ProductsList } from '../components';

export function Products() {
  return (
    <div className="space-y-4">
      <ProductsList />
      <div className="bg-#f9f9f9 border-#ddd border-1 rounded-md p-4">
        <AddProduct />
        <hr className="my-4" />
        <GenerateProducts />
      </div>
    </div>
  );
}
