import { useMutationState } from '@tanstack/react-query';
import { ProductType, useQueryProducts } from '..';
import { DeleteProduct } from './DeleteProduct';
import { Product } from './Product';

export function ProductsList() {
  const query = useQueryProducts();
  const { products } = query;
  const variables = useMutationState<ProductType>({
    filters: {
      mutationKey: ['products', 'add'],
      status: 'pending',
    },
    select: (mutation) => mutation.state.variables,
  });

  return (
    <>
      {query.isLoading && <p>Loading...</p>}
      {query.isSuccess && products!.length > 0 && (
        <ul className="bg-#f9f9f9 border-#ddd border-1 rounded-md">
          {products!.map((product) => (
            <li
              key={product.id}
              className="flex mx-2 ietms-left border-t-1 border-solid border-#ddd first:border-none"
            >
              <Product
                product={product}
                actions={<DeleteProduct productId={product.id} />}
              />
            </li>
          ))}
          {variables.map((variable) => (
            <li className="flex justify-between p-4 items-center border-t-1 border-solid border-#ddd">
              <Product
                product={{
                  id: products!.length,
                  name: variable.name,
                  quantity: variable.quantity,
                  brand: variable.brand,
                }}
                pending
                actions={
                  <DeleteProduct disabled productId={products!.length} />
                }
              />
            </li>
          ))}
        </ul>
      )}
      {query.isError && <p>Error: {query.error?.message}</p>}
    </>
  );
}
