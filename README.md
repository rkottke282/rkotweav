# rkotweav
Base page for rkotweav.com

## UI

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API

## Deploying

Serverless is used to deploy the backend lambdas.  To deploy first cd into the directory and run:

    npm run build

Then, from the root directory, run:

    serverless deploy

To deploy just one function:

    serverless deploy function -f <function_name>

To remove, run:

    serverless remove

To test, run:

    serverless invoke --function getGoogleDoc --path api/getGoogleDoc/test/sample.json