import { useQueryProducts } from '..';
import { DeleteProduct } from './DeleteProduct';
import { Product } from './Product';

export function ProductsList() {
  const query = useQueryProducts();
  const { products } = query;

  return (
    <>
      {query.isLoading && <p>Loading...</p>}
      {query.isSuccess && products!.length > 0 && (
<<<<<<< HEAD
        <div className="rounded-md border border-solid border-gray-200 bg-gray-50">
=======
        <ul className="rounded-md border border-solid border-gray-200 bg-white">
>>>>>>> f609a0abc8cdbdcfdcc43c1976d34090a75a4706
          {products!.map((product) => (
            <div
              key={product.id}
              className="border-t border-solid border-gray-200 first:border-none"
            >
              <Product
                product={product}
                actions={<DeleteProduct product={product} />}
              />
            </div>
          ))}
        </div>
      )}
      {query.isError && <p>Error: {query.error?.message}</p>}
    </>
  );
}
