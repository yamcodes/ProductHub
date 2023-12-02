import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Textbox } from '@/components';
// This module is a faker.js tree-shakable wrapper.
// Ideally, we shouldn't do this in the frontend.
// In that case, tree-shaking wouldn't even matter.
// TODO: Move faker.js to the backend.
import { randProductName, randNumber, randCompanyName } from '@ngneat/falso';
import { queryKey, useAddProduct } from '..';
import { valueAsNumber } from '@/lib/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Icons } from '@/lib/phosphor';
import { api } from '@/lib/trpc';

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
  const { data: products, status, error } = api.products.all.useQuery();
  const { mutateAsync } = useAddProduct({ alwaysRefetch: false });
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
  const queryClient = useQueryClient();

  const handleSubmit = async (values: Values) => {
    try {
      await Promise.all(
        Array.from({ length: values.amount }).map(() =>
          mutateAsync({
            name: randProductName(),
            quantity: randNumber({ min: 1, max: 99 }),
            brand: randCompanyName(),
          }),
        ),
      );
      // invalidate the query so that it refetches the data after the bulk insert
      queryClient.invalidateQueries({ queryKey });
      reset();
      console.log('Successfully generated products.');
    } catch (error) {
      console.error(error);
    }
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
      <div className="text-sm text-gray-500">
        {JSON.stringify(products, null, 2)}
      </div>
      <div className="text-sm text-gray-500">{status}</div>
      <div className="text-sm text-gray-500">{error?.message}</div>
    </form>
  );
}
