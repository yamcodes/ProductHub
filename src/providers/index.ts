import { withIcons } from './Icons';
import { withQueryClient } from './QueryClientProvider';
import { withSuspense } from './Suspense';

export * from './AppProvider';

export const providers = [withSuspense, withQueryClient, withIcons];
