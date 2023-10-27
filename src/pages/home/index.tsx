import { AddProductForm } from '~/features/add-product';
import ProductsList from '~/widgets/products-list';

export default function Home() {
  return (
    <div className="space-y-4">
      <ProductsList />
      <AddProductForm />
    </div>
  );
}
