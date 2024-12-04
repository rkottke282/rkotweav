export const getDocumentContent = async (documentId: string) => {
    return fetch(
        `https://di9xmpy8a7.execute-api.us-east-1.amazonaws.com/documents/${documentId}`
    ).then(response => {
        return response.json();
    }).then(json => {
        if (json.error) return 'error';
        return json;
    }).catch(error => {
        return 'error';
    });
}

export const getScores = async (content: object) => {
    return fetch(
        `https://di9xmpy8a7.execute-api.us-east-1.amazonaws.com/calculateParticipantScores`,
        {
            method: 'POST',
            body: JSON.stringify(content)
        }
    ).then(response => {
        return response.json();
    }).catch(error => {
        return undefined;
    }); 
}