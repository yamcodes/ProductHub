import { Button, Textbox } from '@/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
// This module is a faker.js tree-shakable wrapper.
// Ideally, we shouldn't do this in the frontend.
// In that case, tree-shaking wouldn't even matter.
// TODO: Move faker.js to the backend.
import { Icons } from '@/lib/phosphor';
import { api, useUtils } from '@/lib/trpc';
import { valueAsNumber } from '@/lib/zod';

interface Values {
  amount: number;
}

const schema = z.object({
  amount: (() => {
    const betweenMessage = 'Amount must be between 1 and 10.';
    return valueAsNumber(
      z.number().min(1, betweenMessage).max(10, betweenMessage),
      'Amount must not be empty.',
    );
  })(),
});

export function GenerateProducts() {
  const { mutateAsync } = api.products.generateMany.useMutation();
  const {
    register,
    handleSubmit: formSubmitHandler,
    formState: { errors, isSubmitting, isValidating },
    reset,
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: 10,
    },
  });

  const { products } = useUtils();

  const handleSubmit = async (values: Values) => {
    const { amount } = values;
    await mutateAsync({ amount });
    // invalidate the query so that it refetches the data after the bulk insert
    products.all.invalidate();
    reset();
  };

  const isError = Object.values(errors).every((value) => !value);

  return (
    <form onSubmit={formSubmitHandler(handleSubmit)} className="space-y-4">
      <Textbox
        {...register('amount', { valueAsNumber: true })}
        placeholder="1"
        type="number"
        label="Amount"
        errorMessage={errors.amount?.message}
      />
      <Button
        type="submit"
        disabled={isSubmitting || isValidating || !isError}
        color="success"
        icon={<Icons.MagicWand />}
      >
        Generate
      </Button>
    </form>
  );
}
