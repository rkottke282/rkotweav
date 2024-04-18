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

Currently this application is manually deployed (I know, I know, I'm sorry...).

Services:
    - getGoogleDoc -> create/update lambda.  
      - includes two environment variables.
        -  `GOOGLE_PRIVATE_KEY`: find in parameter store
        -  `GOOGLE_SERVICE_ACCOUNT_EMAIL`: rkotweav-propbets-backend@propbets.iam.gserviceaccount.com

API:
    - HTTP API via AWS API Gateway, manually configured: https://di9xmpy8a7.execute-api.us-east-1.amazonaws.com