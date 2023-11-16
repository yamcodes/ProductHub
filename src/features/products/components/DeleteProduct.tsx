import { useState } from 'react';
import { Button, Dialog, Icon } from '~/components';
import { useDeleteProduct } from '../api';
import { ProductType } from '..';

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
        color="danger"
        icon={<Icon.Trash />}
      >
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
            color="danger"
            onClick={() => {
              mutate(productId);
              closeDialog();
            }}
            icon={<Icon.Trash />}
          >
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
