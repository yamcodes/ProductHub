import { Dialog as HUIDialog, Transition } from '@headlessui/react';
import { ReactNode, ComponentProps, Fragment } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = ComponentProps<typeof HUIDialog> & {
  actions?: ReactNode[];
  title: string;
};

export const Dialog = ({
  children,
  actions,
  className,
  open,
  title,
  ...rest
}: Props) => (
  <Transition appear show={open} as={Fragment}>
    <HUIDialog
      {...rest}
      className={twMerge(
        'relative z-50 bg-white rounded-md shadow-xl',
        className,
      )}
      as={'div'}
    >
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black/25" />
      </Transition.Child>
      <div className="fixed inset-0 overflow-y-auto">
        <div className="min-h-full flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <HUIDialog.Panel className="relative z-50 bg-white rounded-md shadow-xl p-4">
              <HUIDialog.Title className="font-medium text-lg" as="h3">
                {title}
              </HUIDialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  <>{children}</>
                </p>
              </div>
              <div className="mt-4">
                {actions && (
                  <div className="flex justify-end space-x-2">{actions}</div>
                )}
              </div>
            </HUIDialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </HUIDialog>
  </Transition>
);
