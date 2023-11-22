import { Router } from 'express';
import { searchController } from '~/controllers/search.controllers';
import { searchValidator } from '~/middlewares/search.middleares';
import { paginationValidator } from '~/middlewares/tweets.middlewares';
import { accessToKenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares';

const searchRouter = Router();

searchRouter.get(
  '/',
  accessToKenValidator,
  verifiedUserValidator,
  searchValidator,
  paginationValidator,
  searchController
);

export default searchRouter;
