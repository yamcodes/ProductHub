import { FastifyPluginAsync } from 'fastify';

const products: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    return 'this is an example';
  });
};

export default products;
