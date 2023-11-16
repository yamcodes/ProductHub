import {
  AddProduct,
  useDeleteProducts,
  useQueryProducts,
} from '~/features/products';
import { GenerateProducts } from '~/features/products';
import { ProductsList } from '../components';
import { Button, Dialog } from '~/components';
import { useState } from 'react';

export function Products() {
  const { mutate } = useDeleteProducts();
  const { products } = useQueryProducts();
  const n = products?.length ?? 0;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => setIsDialogOpen(true);

  return (
    <div className="space-y-4">
      {/* Temporary delete all products button until we have a proper header for that */}
      <Button
        onClick={openDialog}
        disabled={!n}
        color="danger"
        icon={<IconTablerTrash />}
      >
        Delete All {n} Product{n === 1 ? '' : 's'}
      </Button>
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title={`Delete ${n} products?`}
        actions={[
          <Button
            key="cancel"
            variant="secondary"
            onClick={() => setIsDialogOpen(false)}
          >
            Cancel
          </Button>,
          <Button
            key="delete"
            color="danger"
            onClick={() => {
              setIsDialogOpen(false);
              mutate();
            }}
            icon={<IconTablerTrash />}
          >
            Delete All
          </Button>,
        ]}
      >
        Are you sure you want to delete all {n} product{n === 1 ? '' : 's'}?
        <br />
        <br />
        <b>This action cannot be undone.</b>
      </Dialog>

      <ProductsList />
      <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
        <AddProduct />
        <hr className="my-4" />
        <GenerateProducts />
      </div>
    </div>
  );
}
