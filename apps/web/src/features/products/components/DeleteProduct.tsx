import { useState } from 'react';
import { Button, Dialog } from '@/components';
import { useDeleteProduct } from '../api';
import { ProductType } from '..';
import { Icons } from '@/lib/phosphor';

interface Props {
  product: ProductType;
  disabled?: boolean;
}

export function DeleteProduct({ product, disabled: disabledOverride }: Props) {
  const { mutate, isLoading } = useDeleteProduct();

  const disabled = disabledOverride || isLoading;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <>
      <Button
        onClick={() => setIsDialogOpen(true)}
        disabled={disabled}
        variant="secondary"
        color="danger"
        icon={<Icons.Trash />}
      >
        <span>Delete</span>
      </Button>
      <Dialog
        open={isDialogOpen}
        onClose={() => closeDialog()}
        title={`Delete ${product.name}`}
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
              mutate(product.id);
              closeDialog();
            }}
            icon={<Icons.Trash />}
          >
            Delete
          </Button>,
        ]}
      >
        You are about to delete <b>{product.name}</b>.
        <br />
        <br />
        <b>This action cannot be undone.</b>
      </Dialog>
    </>
  );
}
