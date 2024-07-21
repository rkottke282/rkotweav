import React, { useState, useEffect, ReactPropTypes } from 'react';
import { getDocumentContent, getScores } from './api/api';

type TScores = {
  pointsAwarded?: number
  pointsPossible?: number
  participantScores?: any
}

const GoogleDocReader = (props: any) => {
  const [docId, setDocId] = useState('');
  const [docContent, setDocContent] = useState<any>({});
  const [scores, setScores] = useState<TScores>({});

  const getContentAndCalculateScores = async (docId: string) => {
    setDocId(docId);
    const content = await getDocumentContent(docId);
    if (content && content !== "error") {
      setDocContent(content);
      const scores = await getScores(content);
      setScores(scores);
    }
  }

  const renderScores = () => {
    if (scores.participantScores){
      return (
        <div>
          {Object.keys(scores.participantScores).map((participant, idx) => <h3 key={idx}>{participant}: {String(scores.participantScores[participant])}</h3>)}
          <h4>Progress: {scores.pointsAwarded} / {scores.pointsPossible}</h4>
        </div>
      )
    }
  }

  const renderStatus = () => {
    if (docId && !docContent.title) {
      return (
        <div>
          <h1>Getting Google Doc...</h1>
        </div>  
    )} else if (docContent.title && !scores.participantScores) {
      return (
        <div>
          <h1>Calculating Scores...</h1>
        </div>
    )} else if (docContent === "error") {
      return (
        <div>
          <h1>An error occurred retrieving the Google Doc</h1>
        </div>
    )}  
  }

  useEffect(() => {
    if (props.googleDocId) {
      getContentAndCalculateScores(props.googleDocId);
    }
  }, [props.googleDocId]);

  return (
    <main className="flex min-h-screen flex-col items-center jusitfy-between p-24">
      <div>
        {renderStatus()}
        {renderScores()}
      </div>
    </main>
      
  );
};

export default GoogleDocReader;
