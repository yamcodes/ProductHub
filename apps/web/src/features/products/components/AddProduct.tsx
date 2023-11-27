import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, Textbox } from '~/components/Elements';
import { valueAsNumber } from '~/lib/zod';
import { useAddProduct } from '..';

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

export function AddProduct() {
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
    await mutateAsync(values);
    reset();
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
      <Button
        type="submit"
        disabled={isSubmitting || isValidating || !isError}
        color="success"
      >
        Submit new product
      </Button>
    </form>
  );
}
