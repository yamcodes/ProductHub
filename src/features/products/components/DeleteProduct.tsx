import { useState } from 'react';
import { Button, Dialog } from '~/components';
import { ProductType } from '..';
import { useDeleteProduct } from '../api';

interface Props {
  productId: ProductType['id'];
  disabled?: boolean;
}

export function DeleteProduct({
  productId,
  disabled: disabledOverride,
}: Props) {
  const { mutate, isPending } = useDeleteProduct();

  const disabled = disabledOverride || isPending;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <>
      <Button
        onClick={() => setIsDialogOpen(true)}
        disabled={disabled}
        variant="secondary"
        color="error"
      >
        <i className="i-tabler:trash mr-1" />
        <span>Delete</span>
      </Button>
      <Dialog
        open={isDialogOpen}
        onClose={() => closeDialog()}
        title="Delete product?"
        actions={[
          <Button
            key="cancel"
            variant="secondary"
            onClick={() => closeDialog()}
          >
            Cancel
          </Button>,
          <Button
            key="delete"
            variant="secondary"
            color="error"
            onClick={() => {
              mutate(productId);
              closeDialog();
            }}
          >
            <i className="i-tabler:trash mr-1" />
            Delete
          </Button>,
        ]}
      >
        Are you sure you want to delete this product?
        <br />
        <br />
        <b>This action cannot be undone.</b>
      </Dialog>
    </>
  );
}
