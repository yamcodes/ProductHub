import { useMutationState } from '@tanstack/react-query';
import { ProductType, useQueryProducts } from '..';
import { DeleteProduct } from './DeleteProduct';
import { Product } from './Product';
import { twJoin } from 'tailwind-merge';

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
        <div className="bg-#f9f9f9 border-#ddd border-1 rounded-md">
          <table className={twJoin('layout-fixed w-full border-collapse')}>
            <thead>
              <tr className="border-b text-gray-500 mx-4">
                <th className="p-0">Quantity</th>
                <th className="p-4 w-16">Name</th>
                <th className="p-4 w-32 ">Brand</th>
                <th className="p-4 w-64">Actions</th>
              </tr>
            </thead>
          </table>
          {products!.map((product) => (
            <div
              key={product.id}
              className="border-t-1 border-solid border-#ddd first:border-none"
            >
              <Product
                product={product}
                actions={<DeleteProduct productId={product.id} />}
              />
            </div>
          ))}
          {variables.map((variable) => (
            <div className="border-t-1 border-solid border-#ddd">
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
            </div>
          ))}
        </div>
      )}
      {query.isError && <p>Error: {query.error?.message}</p>}
    </>
  );
}
