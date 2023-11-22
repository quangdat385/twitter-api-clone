import { Router } from 'express';
import {
  uploadImageController,
  uploadVideoController,
  uploadVideoHLSController
} from '~/controllers/medias.controller';
import { accessToKenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares';
import { wrapRequestHandler } from '~/utils/handlers';

const mediasRouter = Router();

mediasRouter.post(
  '/upload-image',
  accessToKenValidator,
  verifiedUserValidator,
  wrapRequestHandler(uploadImageController)
);
mediasRouter.post(
  '/upload-video',
  accessToKenValidator,
  verifiedUserValidator,
  wrapRequestHandler(uploadVideoController)
);
mediasRouter.post(
  '/upload-video-hls',
  accessToKenValidator,
  verifiedUserValidator,
  wrapRequestHandler(uploadVideoHLSController)
);

export default mediasRouter;
