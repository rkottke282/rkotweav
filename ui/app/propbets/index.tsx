import React, { useState, useEffect, ReactPropTypes } from 'react';
import { getDocumentContent } from './api';
const GoogleDocReader = (props: any) => {
  const [docContent, setDocContent] = useState('');

  const getContentAndCalculateScores = async (docId: string) => {
    const content = await getDocumentContent(docId);
    if (content) {
      setDocContent(content);
      const scores = await getScores(content);
    }
  }

  useEffect(() => {
    if (props.googleDocId) {
      getContentAndCalculateScores(props.googleDocId);
    }
  }, [props.googleDocId]);

  //WHEN props.googleDocId is rendered, make the calls!
  // useEffect(() => {
  //   const loadGoogleDoc = async () => {
  //     try {
        

  //       // const content = response.data.body.content.map(item => item.paragraph.elements.map(element => element.textRun.content)).join('\n');
  //       // setDocContent(realData);
  //     } catch (error) {
  //       console.error('Error loading Google Doc:', error);
  //     }
  //   };

  //   loadGoogleDoc();
  // }, []);

  return (
    <div>
      <h1>Google Doc Content</h1>
      {docContent ? 
        <h2>Successfully retrieved Google document! Calculating scores...</h2> : 
        <h2>Failed to retrieve Google document</h2>
      }
    </div>
  );
};

export default GoogleDocReader;
