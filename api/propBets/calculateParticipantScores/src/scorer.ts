


const skippableRows = [
    'CONFIRMED TOTAL',
    'RANK:',
    'Tie Breaker: Correct answers out of 49 by winner?',
    'Bonus Tie Breaker: Correct answers out 49 of by loser?',
]

export const score = (data): Object => {
    const scores = initScores(data);
    let pointsAwarded = 0;
    let pointsPossible = 0;
    data.forEach(row => {
        if (!skippableRows.includes(row['Questions'])) {
            pointsPossible++;
            pointsAwarded += row["Answers"] ? 1 : 0;
            scoreRow(scores, row);
        }
    });
    return {
        pointsAwarded: pointsAwarded,
        pointsPossible: pointsPossible,
        participantScores:    scores
    };
}

export const rankParticipantScores = (participantScores): Object => {
    const participantsByScore = {};
    Object.keys(participantScores).forEach(x => {
        const thisParticipantsScore = participantScores[x]
        if (thisParticipantsScore in participantsByScore) {
            participantsByScore[thisParticipantsScore] = [...participantsByScore[thisParticipantsScore], x]
        } else {
            participantsByScore[thisParticipantsScore] = [x]
        }
    })

    let currentRank = 1;
    const rankings = {};
    const scores = Object.keys(participantsByScore).sort().reverse();
    scores.forEach(x => {
        rankings[currentRank] = participantsByScore[x];
        currentRank++;
    });
    return rankings;
}

const scoreRow = (scores, propRow) => {
    Object.keys(scores).forEach(participant => {
        // console.log(`scoreing ${participant} and they said ${propRow[participant]} but the answer is ${propRow['Answers']}`);
        if (propRow[participant].toUpperCase() === propRow['Answers'].toUpperCase()) {
                scores[participant] = scores[participant] + 1;
        }
    });
    return scores;
}

export const initScores = (data): Object => {
    const scores = {};
    const aRecord = data[0]; 
    Object.keys(aRecord).forEach(key => {
        if ((key !== "Questions")
             && (key !== "Answers")
             && (key !== "Answer Type"))
             scores[key] = 0;
    });
    return scores;
}