import { useAddProduct } from '..';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormValues {
  name?: string;
  quantity?: number;
  brand?: string;
}

export function Form() {
  const { mutate } = useAddProduct();
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { name, quantity, brand } = data;

    if (!name || !quantity || !brand) {
      console.log('Invalid input');
      return;
    }
    mutate({ name, quantity, brand });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} placeholder="name" />
      <input {...register('quantity')} placeholder="quantity" type="number" />
      <input {...register('brand')} placeholder="brand" />
      <button type="submit">Submit</button>
    </form>
  );
}
