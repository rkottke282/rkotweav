import React, { useState, useEffect, ReactPropTypes } from 'react';
const GoogleDocReader = (props: any) => {
  const [docContent, setDocContent] = useState('');

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
      <pre>{props.googleDocId}</pre>
    </div>
  );
};

export default GoogleDocReader;
