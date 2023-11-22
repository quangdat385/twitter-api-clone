import { Router } from 'express';
import {
  serveImageController,
  serveM3u8Controller,
  serveSegmentController,
  serveVideoStreamController
} from '~/controllers/medias.controller';

const staticRouter = Router();

staticRouter.get('/image/:name', serveImageController);
staticRouter.get('/video-stream/:id/:name', serveVideoStreamController);
staticRouter.get('/video-hls/:id/master.m3u8', serveM3u8Controller);
staticRouter.get('/video-hls/:id/:v/:segment', serveSegmentController);

export default staticRouter;