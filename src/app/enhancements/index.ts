import withQueryClient from './with-query-client';
import { compose } from 'recompose';

export const enhance = compose(withQueryClient);
