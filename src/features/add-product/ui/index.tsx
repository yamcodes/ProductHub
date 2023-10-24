import { useAddProduct } from '..';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormValues {
  name?: string;
  quantity?: number;
  brand?: string;
}

export function AddProductForm() {
  const { mutate } = useAddProduct();
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { name, quantity, brand } = data;

    if (!name || !quantity || !brand) {
      console.log('Invalid input');
      return;
    }

    console.log('Adding product...', { name, quantity, brand });
    mutate({ name, quantity, brand });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} placeholder="name" />
      <input {...register('quantity')} placeholder="quantity" />
      <input {...register('brand')} placeholder="brand" />
      <button type="submit">Submit</button>
    </form>
  );
}
