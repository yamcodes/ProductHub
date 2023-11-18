import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Textbox } from '~/components';
import { faker } from '@faker-js/faker';
import { queryKey, useAddProduct } from '..';
import { valueAsNumber } from '~/lib/zod';
import { useQueryClient } from '@tanstack/react-query';
import * as Icon from '@phosphor-icons/react';

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
            name: faker.commerce.productName(),
            quantity: faker.number.int({ min: 1, max: 99 }),
            brand: faker.company.name(),
          }),
        ),
      );
      // invalidate the query so that it refetches the data after the bulk insert
      queryClient.invalidateQueries({ queryKey });
      reset();
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
        icon={<Icon.MagicWand />}
      >
        Generate
      </Button>
    </form>
  );
}
