import { useState } from 'react';
import { Button, Dialog } from '~/components';
import {
  AddProduct,
  GenerateProducts,
  useDeleteProducts,
  useQueryProducts,
} from '~/features/products';
import { ProductsList } from '../components';

import * as Icon from '@phosphor-icons/react';

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
      <Button // TODO: add tooltip? Not sure if we need it. Find examples of this.
        onClick={openDialog}
        disabled={!n}
        color="danger"
        variant="primary"
        // size="md" TODO: match the size of the icon to the size specified here.
        icon={<Icon.Trash />}
      >
        Delete All
      </Button>
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title={`Delete ${nString}`}
        actions={[
          <Button
            key="cancel"
            variant="secondary"
            onClick={() => setIsDialogOpen(false)}
          >
            Cancel
          </Button>,
          <Button // TODO: add keyboard actions
            key="delete"
            color="danger"
            onClick={() => {
              setIsDialogOpen(false);
              mutate();
            }}
            icon={<Icon.Trash />}
          >
            Delete All
          </Button>,
        ]}
      >
        You are about to delete <b>{nString}</b>.
        <br />
        <br />
        <b>This action cannot be undone.</b>
      </Dialog>

      <ProductsList />
      <div className="rounded-md border border-gray-200 bg-white p-4">
        <AddProduct />
        <hr className="my-4" />
        <GenerateProducts />
      </div>
    </div>
  );
}
