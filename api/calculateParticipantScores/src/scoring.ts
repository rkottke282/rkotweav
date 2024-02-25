import { DSVRowArray } from "d3";

export const calculateScores = (data: DSVRowArray): Object => {
    const scores = initScores(data.columns);
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

const initScores = (columnNames: Array<string>): Object => {
    const scores = {};
    columnNames.forEach(colHeader => {
        if ((colHeader !== "Questions")
             && (colHeader !== "Answers")
             && (colHeader !== "Answer Type"))
             scores[colHeader] = 0;
    });
    return scores;
}