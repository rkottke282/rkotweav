'use client'
import React, { useState } from 'react';
import GoogleDocReader from './scores';
import "@/app/globals.css";

const PropBets = () => {
  const [docIdInput, setDocIdInput] = useState('');
  const [docId, setDocId] = useState('');
  const initiateScoreCalculation = () => {
    setDocId(docIdInput);
    setDocIdInput('');
  }
  return (
    <main className='flex min-h-screen flex-col items-center align-middle'>
      <div>
        <h2 className='mb-3 text-4xl font-semibold italic'>Prop Bets</h2>
      </div>

      <div className='outline p-2 flex items-center rounded-lg space-x-2'> 
        <input 
          placeholder='Enter google doc id...'
          className=''
          id='googleDocIdInput'
          value={docIdInput}
          onChange={(x) => setDocIdInput(x.target.value)}
        />

        <input 
          className='min-w-7 p-1 outline outline-slate-600 rounded text-xs'
          id='googleDocIdSubmit'
          type='button'
          value='Calculate'
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
    </main>
    
  );
};

export default PropBets;
