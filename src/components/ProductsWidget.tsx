import useProducts from '../hooks/useProducts.hook';
import { useRef } from 'react';

export default function ProductsWidget() {
  const { isLoading, isError, products, error, addProduct, isSuccess } =
    useProducts();

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
    addProduct({ name, quantity, brand });
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isSuccess && (
        <ol>
          {products!.map((product) => (
            <li key={product.id}>
              {product.name} : {product.quantity}
            </li>
          ))}
        </ol>
      )}
      {isError && <p>Error: {error?.message}</p>}
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
