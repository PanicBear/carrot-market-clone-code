import type { ResponseType } from '@customTypes/index';
import { client, withApiSession, withHandler } from '@libs/server/index';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  switch (req.method) {
    case 'GET':
      const products = await client.product.findMany();
      res.json({
        ok: true,
        products,
      });
      break;
    case 'POST':
      const {
        body: { name, price, description },
        session: { user },
      } = req;
      const product = await client.product.create({
        data: {
          name,
          price: +price,
          description,
          imageUrl: 'not implemented yet',
          user: {
            connect: {
              id: user?.id,
            },
          },
        },
      });
      res.json({
        ok: true,
        product,
      });
      break;
    case 'PUT':
    case 'DELETE':
    default:
      res.json({
        ok: false,
        message: 'Method not allowed',
      });
  }
}

export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler,
  }),
);