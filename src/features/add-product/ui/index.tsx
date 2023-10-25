import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAddProduct } from '..';

interface FormValues {
  name: string;
  quantity: number;
  brand: string;
}

const schema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  quantity: z
    .number()
    .min(1, 'Quantity must be between 1 and 10')
    .max(10, 'Quantity must be between 1 and 10'),
  brand: z.string().min(1, 'Brand must not be empty'),
});

export function Form() {
  const { mutate } = useAddProduct();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      quantity: 1,
      brand: '',
    },
  });

  return (
    <form onSubmit={handleSubmit((values) => mutate(values))}>
      <div>
        <label htmlFor="name">Name</label>
        <input {...register('name')} placeholder="Bottle (Glass)" type="text" />
        {errors.name?.message && <div>{errors.name?.message}</div>}
      </div>
      <div>
        <label htmlFor="quantity">Quantity</label>
        <input
          {...register('quantity', { valueAsNumber: true })}
          placeholder="1"
          type="number"
        />
        {errors.quantity?.message && <div>{errors.quantity?.message}</div>}
      </div>
      <div>
        <label htmlFor="brand">Brand</label>
        <input {...register('brand')} placeholder="Coca Cola" />
        {errors.brand?.message && <div>{errors.brand?.message}</div>}
      </div>
      <button type="submit" disabled={!isDirty}>
        Submit
      </button>
    </form>
  );
}
