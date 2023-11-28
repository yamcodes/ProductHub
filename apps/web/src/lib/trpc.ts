import { createTRPCReact } from '@trpc/react-query';
import type { Router } from '../../../api/src/router';
export const trpc = createTRPCReact<Router>();
