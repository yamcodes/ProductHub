import withQueryClient from './query-client';
import withSuspense from './suspense';
import { compose } from 'recompose';

export const enhance = compose(withSuspense, withQueryClient);
