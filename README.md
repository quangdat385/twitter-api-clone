# twitter-api-clone

**Technologies used**: REST API , Typescript , Express , MongoDB Driver , MVC Pattern ,Jsonwebtoken ,Express-Validator , AWS S3 & SES , Docker ,Swagger ,Web-Socket ,pm2 , ESLint, Prettier,Helmet...

**Functions include**:

- Validate and Sanitize by express-validator.
- User : Manage authentication with JWT (automatic token refresh applied), Login, Register(Google OAuth), Logout , Refresh Token, Send Verify Email (using AWS SES), ...
- Medias: Upload images, Upload videos, Upload hsl videos(using formidable,AWS S3,Encode Video by ffmpeg,...)
- Static :Get Images ,Get Video , HLS Streaming Video .
- Likes :Like, Unlike
- Search : Search Tweets
- Bookmarks : Bookmarks, UnBookmarks
- Tweets: Create Tweet, Get Tweet, Get Childern Tweet, get News Feeds
- Conversions : get Receiver Chat,
- Server security by using helmet and cor
- Limit Request by using express-rate-limit
- Using Docker, pm2, github, github action,CI/CD to deyloy to VPS
- Code Splitting
