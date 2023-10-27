import { ProductItem } from '~/entities/products';
import { useAddProduct } from '~/features/add-product';
import { DeleteProductButton } from '~/features/delete-product';
import { useQueryProducts } from '~/features/query-products';

export function ProductsList() {
  const query = useQueryProducts();
  const createMutation = useAddProduct();
  const { products } = query;
  const { variables } = createMutation;

  return (
    <>
      {query.isLoading && <p>Loading...</p>}
      {query.isSuccess && products!.length > 0 && (
        <ol className="bg-#f9f9f9 border-#ddd border-1 rounded-md">
          {products!.map((product) => (
            <li
              key={product.id}
              className="flex justify-between p-4 items-center border-t-1 border-solid border-#ddd first:border-none"
            >
              <ProductItem
                product={product}
                actions={<DeleteProductButton productId={product.id} />}
              />
            </li>
          ))}
          {createMutation.isPending && (
            <li className="flex justify-between p-4 items-center border-t-1 border-solid border-#ddd">
              <ProductItem
                product={{
                  id: products!.length,
                  name: variables!.name,
                  quantity: variables!.quantity,
                  brand: variables!.brand,
                }}
                pending
                actions={
                  <DeleteProductButton disabled productId={products!.length} />
                }
              />
            </li>
          )}
        </ol>
      )}
      {query.isError && <p>Error: {query.error?.message}</p>}
    </>
  );
}
