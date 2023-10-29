import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAddProduct } from '~/features/add-product';
import { valueAsNumber } from '~/shared/lib';
import { Button, Textbox } from '~/shared/ui';

interface Values {
  name: string;
  quantity: number;
  brand: string;
}

const schema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long.'),
  quantity: (() => {
    const betweenMessage = 'Quantity must be between 1 and 99.';
    return valueAsNumber(
      z.number().min(1, betweenMessage).max(99, betweenMessage),
      'Quantity must not be empty.',
    );
  })(),
  brand: z.string().min(1, 'Brand must not be empty.'),
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
      name: '',
      quantity: 1,
      brand: '',
    },
  });

  const handleSubmit = async (values: Values) => {
    try {
      await mutateAsync(values);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const isError = Object.values(errors).every((value) => !value);

  return (
    <form onSubmit={formSubmitHandler(handleSubmit)} className="space-y-4">
      <Textbox
        {...register('name')}
        placeholder="Bottle (Glass)"
        type="text"
        autoComplete="off" // we don't expect a user to have product names in their browser's autocomplete
        label="Name"
        errorMessage={errors.name?.message}
      />
      <Textbox
        {...register('quantity', { valueAsNumber: true })}
        placeholder="1"
        type="number"
        label="Quantity"
        errorMessage={errors.quantity?.message}
      />
      <Textbox
        {...register('brand')}
        placeholder="Coca Cola"
        type="text"
        label="Brand"
        errorMessage={errors.brand?.message}
      />
      <Button type="submit" disabled={isSubmitting || isValidating || !isError}>
        <div
          className="i-tabler:circle-arrow-up-right
        mr-1 mb-2px"
        />
        Submit
      </Button>
    </form>
  );
}
