
export const score = (data): Object => {
    const scores = initScores(data);
    let pointsAwarded = 0;
    let pointsPossible = 0;
    data.forEach(row => {
        pointsPossible++;
        pointsAwarded += row["Answers"] ? 1 : 0;
        scoreRow(scores, row);
    });
    return {
        pointsAwarded: pointsAwarded,
        pointsPossible: pointsPossible,
        participantScores:    scores
    };
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