import withQueryClient from './with-query-client';
import withSuspense from './with-suspense';
import { compose } from 'recompose';

export const enhance = compose(withSuspense, withQueryClient);
