import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAddProduct } from '..';
import { Button } from '~/shared/ui';

interface Values {
  name: string;
  quantity: number;
  brand: string;
}

const schema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters long. Sorry, Bo and Ed.'),
  quantity: z
    .number()
    .min(1, 'Quantity must be between 1 and 10.')
    .max(10, 'Quantity must be between 1 and 10.'),
  brand: z.string().min(1, 'Brand must not be empty.'),
});

export function Form() {
  const { mutate } = useAddProduct();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      quantity: 1,
      brand: '',
    },
  });

  return (
    <form
      onSubmit={handleSubmit((values) => mutate(values))}
      className="bg-#f9f9f9 border-#ddd border-1 rounded-md p-4 space-y-4"
    >
      <div>
        <label htmlFor="name">Name</label>
        <input
          {...register('name')}
          placeholder="Bottle (Glass)"
          type="text"
          id="name"
          autoComplete="off" // we don't expect a user to have product names in their browser's autocomplete
        />
        {errors.name?.message && <div>{errors.name?.message}</div>}
      </div>
      <div>
        <label htmlFor="quantity">Quantity</label>
        <input
          {...register('quantity', { valueAsNumber: true })}
          placeholder="1"
          type="number"
          id="quantity"
        />
        {errors.quantity?.message && <div>{errors.quantity?.message}</div>}
      </div>
      <div>
        <label htmlFor="brand">Brand</label>
        <input {...register('brand')} placeholder="Coca Cola" id="brand" />
        {errors.brand?.message && <div>{errors.brand?.message}</div>}
      </div>
      <Button type="submit">
        <div
          className="i-tabler:circle-arrow-up-right
        mr-1 mb-2px"
        />
        Submit
      </Button>
    </form>
  );
}
