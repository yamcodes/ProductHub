import withQueryClient from './query-client.enhancement';
import withSuspense from './suspense.enhancement';
import { compose } from 'recompose';

export const enhance = compose(withSuspense, withQueryClient);
