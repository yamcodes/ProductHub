import useProducts from '~/shared/hooks/useProducts.hook';
import { useRef } from 'react';
import { DeleteProductButton } from '~/features/delete-product/ui';
import { ProductItem } from '~/entities/products/ui';
export function ProductsList() {
  const { query, createMutation, deleteMutation } = useProducts();

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
    e.preventDefault();
    createMutation.mutate({ name, quantity, brand });
  };

  return (
    <>
      {query.isLoading && <p>Loading...</p>}
      {query.isSuccess && (
        <ol>
          {query.data!.map((product) => (
            <li key={product.id}>
              <ProductItem
                product={product}
                actions={<DeleteProductButton productId={product.id} />}
              />
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
