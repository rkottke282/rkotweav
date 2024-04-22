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
    - getGoogleDoc -> create/update lambda via console.  
      - includes two environment variables.
        -  `GOOGLE_PRIVATE_KEY`: find in parameter store
        -  `GOOGLE_SERVICE_ACCOUNT_EMAIL`: rkotweav-propbets-backend@propbets.iam.gserviceaccount.com
    - calculateParticipantScores -> create/update lambda via conosle.

API:
    - HTTP API via AWS API Gateway, manually configured: https://di9xmpy8a7.execute-api.us-east-1.amazonaws.com
  
  GET /documents/{google-doc-id}

  Response Body:
  
      { 
        title: 'the title',
        data: {
          format: 'csv',
          raw: {
            type: 'Buffer',
            data: []
          }
        }
      }

  POST /calculateParticipantScores

  Request Body: see response body from `/documents/{google-doc-id}`
  
  Response Body:

      {
        "pointsAwarded":47,
        "pointsPossible":47,
        "participantScores":
          {"Mike":25,"Aly":19,"Kaeli ":22,"Stephen":19,"Kyle":0,"Reed":20,"Dave":20,"Al":22,"Christie":17,"Lauren":0,"Sarah K":0,"Shelby ":23,"Sarah":26,"Adam":19}
      }