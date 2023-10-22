import useProducts from '../hooks/useProducts.hook';

export default function ProductsWidget() {
  const { isLoading, isError, isSuccess, products, error } = useProducts();

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isSuccess && (
        <p>
          <ol>
            {products!.map((product) => (
              <li>
                {product.name} : {product.quantity}
              </li>
            ))}
          </ol>
        </p>
      )}
      {isError && <p>Error: {error?.message}</p>}
      <label>Product Name: </label>
      <input type="text" />
      <br />
      <label>Quantity: </label>
      <input type="number" />
      <br />
      <button>Submit</button>
    </>
  );
}
