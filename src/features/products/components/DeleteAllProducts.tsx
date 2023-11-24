import React, { useState } from 'react';
import { Button, Dialog } from '~/components';
import { Icons } from '~/lib/phosphor';

interface DeleteAllProductsProps {
  disabled: boolean;
  n: number;
  onConfirm: () => void;
}

const DeleteAllProducts: React.FC<DeleteAllProductsProps> = ({
  disabled,
  n,
  onConfirm,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const nString = `${n} product${n === 1 ? '' : 's'}`;

  return (
    <>
      <Button
        onClick={openDialog}
        disabled={disabled}
        color="danger"
        variant="primary"
        // icon size should match the size specified here
        icon={<Icons.Trash />}
      >
        Delete All
      </Button>
      <Dialog
        open={isDialogOpen}
        onClose={closeDialog}
        title={`Delete ${nString}`}
        actions={[
          <Button key="cancel" variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>,
          <Button
            key="delete"
            color="danger"
            onClick={() => {
              onConfirm();
              closeDialog();
            }}
            icon={<Icons.Trash />}
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
    </>
  );
};

export default DeleteAllProducts;
