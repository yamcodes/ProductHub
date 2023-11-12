import {
  AddProduct,
  useDeleteProducts,
  useQueryProducts,
} from '~/features/products';
import { GenerateProducts } from '~/features/products';
import { ProductsList } from '../components';
import { Button } from '~/components';

export function Products() {
  const { mutate } = useDeleteProducts();
  const { products } = useQueryProducts();
  const n = products?.length ?? 0;
  return (
    <div className="space-y-4">
      {/* Temporary delete all products button until we have a proper header for that */}
      <Button onClick={() => mutate()} disabled={!n} variant="danger">
        <i className="i-tabler:trash mr-1" />
        Delete All {n} Product{n === 1 ? '' : 's'}
      </Button>
      <ProductsList />
      <div className="border-1 border-#ddd rounded-md bg-#f9f9f9 p-4">
        <AddProduct />
        <hr className="my-4" />
        <GenerateProducts />
      </div>
    </div>
  );
}
