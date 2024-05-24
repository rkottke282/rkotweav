export const getDocumentContent = async (documentId: string) => {
    return fetch(
        `https://di9xmpy8a7.execute-api.us-east-1.amazonaws.com/documents/${documentId}`
    ).then(response => {
        return response.json();
    }).then(json => {
        if (json.error) return undefined;
        return json;
    }).catch(error => {
        return undefined;
    });
}

export const getScores = async (content: object) => {
    //get the scores via api call
}