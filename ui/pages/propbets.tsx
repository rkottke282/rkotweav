// pages/about.jsx

import React, { useState } from 'react';
import GoogleDocReader from '@/app/propbets';

const PropBets = () => {
  const [docIdInput, setDocIdInput] = useState('');
  const [docId, setDocId] = useState('');
  const initiateScoreCalculation = () => {
    setDocId(docIdInput);
    setDocIdInput('');
  }
  return (
    <div>
      <h1>Prop Bets</h1>

      <div> 
        <input 
          id='googleDocIdInput'
          value={docIdInput}
          onChange={(x) => setDocIdInput(x.target.value)}
        />

        <input 
          id='googleDocIdSubmit'
          type='button'
          onClick={initiateScoreCalculation}
        />
      </div>
      {
        docId && 
        <div>
          <GoogleDocReader 
            googleDocId={docId}/>
        </div>
      }
    </div>
  );
};

export default PropBets;
