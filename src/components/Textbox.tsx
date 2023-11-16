import { ComponentProps, forwardRef } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

interface Props extends ComponentProps<'input'> {
  label?: string;
  errorMessage?: string;
}

export const Textbox = forwardRef<HTMLInputElement, Props>(
  ({ className, name, errorMessage, ...rest }, ref) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={name} className="mb-2 text-sm font-medium">
          {rest.label}
        </label>
        <input
          className={twJoin(
            twMerge(
              'sm:max-w-screen rounded border border-gray-200 bg-white px-3 py-1.5 text-sm shadow-sm md:max-w-[300px]',
              errorMessage
                ? 'border-red-400 text-red-700 placeholder-red-300 focus:outline-red-500'
                : 'border-gray-200',
              ' ',
            ),
            className,
          )}
          {...rest}
          name={name}
          id={name}
          ref={ref}
        />
        {errorMessage && (
          <div className="mt-1 text-xs text-red-600">{errorMessage}</div>
        )}
      </div>
    );
  },
);
