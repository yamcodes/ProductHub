import { ProductItem } from '~/entities/products';
import { DeleteProductButton } from '~/features/delete-product';
import { useQueryProducts } from '~/widgets/products-list/api';

export function ProductsList() {
  const { isLoading, isSuccess, isError, products, error } = useQueryProducts();

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isSuccess && products!.length > 0 && (
        <ol className="bg-#f9f9f9 border-#ddd border-1 rounded-md">
          {products!.map((product) => (
            <li
              key={product.id}
              className="flex justify-between p-4 items-center border-b-1 border-solid border-#ddd last:border-none"
            >
              <ProductItem
                product={product}
                actions={<DeleteProductButton productId={product.id} />}
              />
            </li>
          ))}
        </ol>
      )}
      {isError && <p>Error: {error?.message}</p>}
    </>
  );
}
