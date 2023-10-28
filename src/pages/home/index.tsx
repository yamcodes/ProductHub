import { AddProductForm } from '~/features/add-product';
import { GenerateProducts } from '~/features/generate-products';
import { ProductsList } from '~/widgets/products-list';

export function Home() {
  return (
    <div className="space-y-4">
      <ProductsList />
      <div className="bg-#f9f9f9 border-#ddd border-1 rounded-md p-4">
        <AddProductForm />
        <hr className="my-4" />
        <GenerateProducts />
      </div>
    </div>
  );
}
