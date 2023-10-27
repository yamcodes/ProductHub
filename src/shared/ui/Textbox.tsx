import { ComponentProps, forwardRef } from 'react';

interface Props extends ComponentProps<'input'> {
  label?: string;
  errorMessage?: string;
}

const Textbox = forwardRef<HTMLInputElement, Props>(
  ({ className, name, errorMessage, ...rest }, ref) => {
    return (
      <div>
        <label htmlFor={name}>{rest.label}</label>{' '}
        <input
          className={`bg-transparent py-1 px-2 rounded select-none cursor-pointer ${className}`}
          {...rest}
          name={name}
          id={name}
          ref={ref}
        />
        {errorMessage && <div>{errorMessage}</div>}
      </div>
    );
  },
);

export default Textbox;
