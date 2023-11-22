import express from 'express';
import usersRouter from './routes/users.routes';
import cors from 'cors';
// import crypto from 'crypto';
import databaseService from '~/services/database.services';
import { defaultErrorHandler } from './middlewares/error.middlewares';
import { initFolder } from './utils/file';
import mediasRouter from './routes/medias.routes';
import { UPLOAD_VIDEO_DIR } from './constants/dir';
import staticRouter from './routes/static.routes';
import tweetsRouter from './routes/tweets.routes';
import likesRouter from './routes/likes.routes';
import bookmarksRouter from './routes/bookmarks.routes';
import searchRouter from './routes/search.routes';
import { createServer } from 'http';
import initSocket from './utils/socket';
import conversationsRouter from './routes/conversations.routes';
import { envConfig, isProduction } from '~/constants/config';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import morgan from 'morgan';
import { config } from 'dotenv';
// import '~/utils/fake';
config();
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'X clone (Twitter API)',
      version: '1.0.0'
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        BearerAuth: []
      }
    ],
    persistAuthorization: true
  },
  apis: ['./openapi/*.yaml'] // files containing annotations as above
};
const openapiSpecification = swaggerJsdoc(options);

databaseService.connect().then(() => {
  databaseService.indexUsers();
  databaseService.indexRefreshTokens();
  databaseService.indexVideoStatus();
  databaseService.indexFollowers();
  databaseService.indexTweets();
});
const app = express();

const httpServer = createServer(app);

const PORT = envConfig.port;

// Tạo folder upload
initFolder();
app.use(express.json());
// const corsOptions: CorsOptions = {
//   origin: isProduction ? envConfig.clientUrl : '*'
// };
// console.log(crypto.randomBytes(60).toString('hex'));
// const date = new Date('1985-01-03').toISOString();
// console.log(date);
app.use(cors());
app.use(morgan('combined'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use('/users', usersRouter);
app.use('/tweets', tweetsRouter);
app.use('/bookmarks', bookmarksRouter);
app.use('/likes', likesRouter);
app.use('/medias', mediasRouter);
app.use('/search', searchRouter);
app.use('/conversations', conversationsRouter);
app.use('/static', staticRouter);
// app.use('/static/image', express.static(UPLOAD_IMAGE_DIR));
app.use('/static/video', express.static(UPLOAD_VIDEO_DIR));

app.use(defaultErrorHandler);
initSocket(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
