import React from 'react';
import { Button, Dialog } from '~/components';
import { Icons } from '~/lib/phosphor';

const DeleteAllProducts = ({ onClick, disabled, n, onConfirm }) => {
  const openDialog = () => onClick(true);

  const nString = `${n} product${n === 1 ? '' : 's'}`;

  return (
    <>
      <Button
        onClick={openDialog}
        disabled={disabled}
        color="danger"
        variant="primary"
        icon={<Icons.Trash />}
      >
        Delete All
      </Button>
      <Dialog
        open={onClick}
        onClose={() => onClick(false)}
        title={`Delete ${nString}`}
        actions={[
          <Button
            key="cancel"
            variant="secondary"
            onClick={() => onClick(false)}
          >
            Cancel
          </Button>,
          <Button
            key="delete"
            color="danger"
            onClick={() => {
              onClick(false);
              onConfirm();
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
