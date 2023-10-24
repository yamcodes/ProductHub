import { AddProductForm } from '~/features/add-product';
import ProductsList from '~/widgets/products-list';

export default function Home() {
  return (
    <>
      <ProductsList />
      <AddProductForm />
    </>
  );
}
