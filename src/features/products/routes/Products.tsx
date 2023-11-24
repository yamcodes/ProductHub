import { useState } from 'react';
import { Button, Dialog } from '~/components';
import {
  AddProduct,
  GenerateProducts,
  useDeleteProducts,
  useQueryProducts,
} from '~/features/products';
import DeleteAllProducts from '~/features/products/components/DeleteAllProducts';
import { ProductsList } from '../components';
import { Icons } from '~/lib/phosphor';

export function Products() {
  const { mutate } = useDeleteProducts();
  const { products } = useQueryProducts();
  const n = products?.length ?? 0;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => setIsDialogOpen(true);

  const nString = `${n} product${n === 1 ? '' : 's'}`;

  return (
    <div className="space-y-4">
      {/* Temporary delete all products button until we have a proper header for that */}
      {/* TODO: isolate this into a component */}
      {/* TODO: add tooltip? Not sure if we need it. Find examples of this*/}
      {/*// size="md" TODO: match the size of the icon to the size specified here. */}
      <DeleteAllProducts disabled={n === 0} n={n} onConfirm={() => mutate()} />

      <ProductsList />
      <div className="rounded-md border border-gray-200 bg-white p-4">
        <AddProduct />
        <hr className="my-4" />
        <GenerateProducts />
      </div>
    </div>
  );
}
