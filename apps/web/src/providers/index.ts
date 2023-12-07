import { withIcons } from './Icons';
import { withSuspense } from './Suspense';

export * from './AppProvider';

export const providers = [withSuspense, withIcons];
