import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAddProduct } from '~/features/add-product';
import { valueAsNumber } from '~/shared/lib';
import { Button, Textbox } from '~/shared/ui';
import { faker } from '@faker-js/faker';

interface Values {
  amount: number;
}

const schema = z.object({
  amount: valueAsNumber(
    z
      .number()
      .min(1, 'Amount must be between 1 and 10.')
      .max(10, 'Amount must be between 1 and 10.'),
    'Amount must not be empty.',
  ),
});

export function Form() {
  const { mutateAsync } = useAddProduct();
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
      <Button type="submit" disabled={isSubmitting || isValidating || !isError}>
        <div
          className="i-tabler:wand
        mr-1 mb-2px"
        />
        Generate
      </Button>
    </form>
  );
}
