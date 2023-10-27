import { z, ZodNumber } from 'zod';

/**
 * Custom zod resolver for react-hook-form
 * @param numberSchema - ZodNumber schema
 * @returns A schema appropriate for react-hook-form 'valueAsNumber' option
 *
 * @example
 * ```tsx
 * // schema
 * const schema = z.object({
 *  quantity: valueAsNumber(
 *   z
 *    .number()
 *    .min(1, 'Quantity must be between 1 and 99( including).')
 *    .max(99, 'Quantity must be between 1 and 99( including).'),
 *  ),
 * });
 *
 * // form
 * <input {...register('quantity', { valueAsNumber: true })} />
 * ```
 */
export const valueAsNumber = (
  numberSchema: ZodNumber,
  nonEmptyMessage = 'Input must not be empty.',
) =>
  z
    .custom<number | typeof NaN>(
      (value) => typeof value === 'number' && value === value,
      { message: nonEmptyMessage },
    )
    .pipe(numberSchema);
