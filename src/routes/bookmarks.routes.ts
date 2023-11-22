import { RequestHandler, Router } from 'express';
import { bookmarkTweetController, unbookmarkTweetController } from '~/controllers/bookmarks.controllers';
import { tweetIdValidator } from '~/middlewares/tweets.middlewares';
import { accessToKenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares';
import { wrapRequestHandler } from '~/utils/handlers';

const bookmarksRouter = Router();
/**
 * Description: Bookmark Tweet
 * Path: /
 * Method: POST
 * Body: { tweet_id: string }
 * Header: { Authorization: Bearer <access_token> }
 */
bookmarksRouter.post(
  '',
  accessToKenValidator,
  verifiedUserValidator,
  tweetIdValidator,
  wrapRequestHandler(bookmarkTweetController)
);

/**
 * Description: Unbookmark Tweet
 * Path: /tweets/:tweet_id
 * Method: DELETE
 * Header: { Authorization: Bearer <access_token> }
 */
bookmarksRouter.delete(
  '/tweets/:tweet_id',
  accessToKenValidator,
  verifiedUserValidator as unknown as RequestHandler,
  tweetIdValidator,
  wrapRequestHandler(unbookmarkTweetController)
);

export default bookmarksRouter;
