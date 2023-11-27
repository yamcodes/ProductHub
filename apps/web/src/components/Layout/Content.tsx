import { FC, PropsWithChildren } from 'react';

export const Content: FC<PropsWithChildren> = ({ children }) => (
  <div className="px-8 py-3.5">{children}</div>
);
