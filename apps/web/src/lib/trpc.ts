import { createTRPCReact } from '@trpc/react-query';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

import type { Router } from '../../../api/src/router';
export const api = createTRPCReact<Router>();

export type RouterInput = inferRouterInputs<Router>;
export type RouterOutput = inferRouterOutputs<Router>;
