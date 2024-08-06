# Image Resizer Lambda

This Lambda edge function will be invoked when a request for an image file is made to Cloudfront (connected to s3). The url will be changed to point to an webp file that is optimized. It should ideally be paird with an origin response function that converts the file and save it, if it was not already avauilable.

## Run Locally

Clone the project

```bash
  git clone https://github.com/ryonwhyte/cloudfront-point-towebp
```

Install Dependencies

```bash
# Install sharpand deps
npm install ua-parser-js
```

## Deployment

```bash
npm run package
```

Running the command above will zip your source code and dependencies. The zip can then be uploaded to your Lambda. In case you want to have the inlin code editor you can remove the index.js/index.mjs file from the archive and upload it as a layer. Then zip the index file by itself and upload it normally.
