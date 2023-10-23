import useProducts from '../hooks/useProducts.hook';
import { useRef } from 'react';

export default function ProductsWidget() {
  const { query, mutate } = useProducts();

  const productNameRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const brandRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: any) => {
    const name = productNameRef.current?.value;
    const quantity = quantityRef.current
      ? Number(quantityRef.current.value)
      : undefined;
    const brand = brandRef.current?.value;
    if (!name || !quantity || !brand) {
      console.log('Invalid input');
      return;
    }
    console.log(productNameRef.current?.value);
    console.log(quantityRef.current?.value);
    console.log('submit');
    e.preventDefault();
    mutate({ name, quantity, brand });
  };

  return (
    <>
      {query.isLoading && <p>Loading...</p>}
      {query.isSuccess && (
        <ol>
          {query.data!.map((product) => (
            <li key={product.id}>
              {product.name} : {product.quantity}
            </li>
          ))}
        </ol>
      )}
      {query.isError && <p>Error: {query.error?.message}</p>}
      <label>Product Name: </label>
      <input type="text" ref={productNameRef} />
      <br />
      <label>Brand: </label>
      <input type="text" ref={brandRef} />
      <br />
      <label>Quantity: </label>
      <input type="number" ref={quantityRef} min={'1'} />
      <br />
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </>
  );
}
