import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAddProduct } from '..';
import { Button, Textbox } from '~/shared/ui';

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
    .string()
    .refine((value) => value !== '' && !isNaN(Number(value)), {
      message: 'Quantity must not be empty',
    })
    .transform((value) => Number(value))
    .pipe(
      z
        .number()
        .min(1, 'Quantity must be between 1 and 10.')
        .max(10, 'Quantity must be between 1 and 10.'),
    ),
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

  return (
    <form
      onSubmit={formSubmitHandler(handleSubmit)}
      className="bg-#f9f9f9 border-#ddd border-1 rounded-md p-4 space-y-4"
    >
      <Textbox
        {...register('name')}
        placeholder="Bottle (Glass)"
        type="text"
        autoComplete="off" // we don't expect a user to have product names in their browser's autocomplete
        label="Name"
        errorMessage={errors.name?.message}
      />
      <Textbox
        {...register('quantity')}
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
      <Button type="submit" disabled={isSubmitting || isValidating}>
        <div
          className="i-tabler:circle-arrow-up-right
        mr-1 mb-2px"
        />
        Submit
      </Button>
    </form>
  );
}
