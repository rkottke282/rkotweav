import React, { useState, useEffect } from 'react';
import SpreadSheetExample from '@/resources/spreadsheetExample.json';

const GoogleDocReader = () => {
  const [docContent, setDocContent] = useState('');

  useEffect(() => {
    const loadGoogleDoc = async () => {
      try {
        const worksheetData = JSON.parse(SpreadSheetExample.body).data.raw.data;
        console.log('here: ' + worksheetData);

        // const content = response.data.body.content.map(item => item.paragraph.elements.map(element => element.textRun.content)).join('\n');
        setDocContent(worksheetData);
      } catch (error) {
        console.error('Error loading Google Doc:', error);
      }
    };

    loadGoogleDoc();
  }, []);

  return (
    <div>
      <h1>Google Doc Content</h1>
      <pre>{docContent}</pre>
    </div>
  );
};

export default GoogleDocReader;