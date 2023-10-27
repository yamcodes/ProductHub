import { ComponentProps, forwardRef } from 'react';
import clsx from 'clsx';

interface Props extends ComponentProps<'input'> {
  label?: string;
  errorMessage?: string;
}

const Textbox = forwardRef<HTMLInputElement, Props>(
  ({ className, name, errorMessage, ...rest }, ref) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={name} className="text-sm font-medium mb-2">
          {rest.label}
        </label>
        <input
          className={clsx(
            'bg-white text-sm border-#ddd border-1 shadow-sm py-1.5 px-3 rounded md:max-w-[300px] sm:max-w-screen',
            errorMessage
              ? 'border-red-400 text-red-700 focus:outline-red-500 placeholder-red-300'
              : 'border-#ddd',
            ' ',
            className,
          )}
          {...rest}
          name={name}
          id={name}
          ref={ref}
        />
        {errorMessage && (
          <div className="text-xs text-red-600 mt-1">{errorMessage}</div>
        )}
      </div>
    );
  },
);

export default Textbox;
