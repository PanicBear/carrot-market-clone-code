import type { ResponseType } from '@customTypes/index';
import { withApiSession, withHandler } from '@libs/server/index';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  // console.log(process.env.CLOUDINARY_UPLOAD_PRESET_NAME);
  // console.log(process.env.CLOUDINARY_CLOUD_NAME);
  // console.log(result);

  console.log(req);

  res.json({
    ok: true,
    url: '',
  });
}

export default withApiSession(
  withHandler({
    methods: ['POST'],
    handler,
  }),
);
