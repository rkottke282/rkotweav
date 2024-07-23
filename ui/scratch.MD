# Propbets

### First Iteration

 - Display the participants and their score, in descending order
 - Display the progress (points awareded / points possible)

### Second Iteration

 - Display the questions, correct answer, and point value
 - Display any individuals list of answers, marking correct/incorrect

### N Iteration

 - Compare head to head?
 - Login with your own google account?
 - Toast whenever an answer is filled in?
 - Unique Sessions

## How to achieve first iteration

- Calculate the points awarded vs. points possible
- Calculate each participants score
- Output

### We should probably do this via another lambda...

 - Pass in the data -> get back a JSON for easy printability
 - Format:
    
        { pointsPossible: <number>, 
          pointsAwareded: <number>,
          participantScores: [
            { participant: <string>
                score: <number> }, ...
          ],
          praticipantRankings: [
            { participant: <string>,
                rank: <number> }, ...
          ]
        }