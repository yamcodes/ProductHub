import { useAddProduct } from '..';
import { useForm } from '@tanstack/react-form';

export function Form() {
  const { mutate } = useAddProduct();
  const form = useForm({
    // memoize the default values to prevent re-renders
    defaultValues: {
      name: '',
      quantity: 0,
      brand: '',
    },
    onSubmit: (values) => mutate(values),
  });
  const { Provider, Field } = form;

  return (
    <Provider>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <Field
          name="name"
          children={(field) => (
            <input
              name={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="name"
            />
          )}
        />
        <Field
          name="quantity"
          children={(field) => (
            <input
              name={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.valueAsNumber)}
              onBlur={field.handleBlur}
              type="number"
              placeholder="quantity"
            />
          )}
        />
        <Field
          name="brand"
          children={(field) => (
            <input
              name={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              placeholder="brand"
            />
          )}
        />
        <button type="submit">Submit</button>
      </form>
    </Provider>
  );
}
