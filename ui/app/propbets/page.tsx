'use client'
import React, { useState } from 'react';
import GoogleDocReader from './scores';
import "@/app/globals.css";
import Modal from '../components/modal';


const instructions = () => {
  return (
    <h1>
      The prop bets application is designed to read in, calculate and display the 
      current standings of a prop bet spreadsheet. 
    <br/><br/>
      The prop bet spreadsheet should be saved as a google spreadsheet with public
      access allowed.  The spreadsheet must be organized as such:

      <li>Column A should contain a list of questions, beginning at row 2</li>
      <li>Column B should contain a list of answers, filled out as they are realized</li>
      <li>Column C should contain a list of answer types, although this feature is in beta and so can be ignored</li>
      <li>Row 1, starting from column D onward, should be a list of participant names</li>
      
      <br/>
      <br/>

      Candidates then fill their guesses out underneath their name corresponding to each of the questions displayed
      along the left hand column (A).  The scorer will assign a point for each
      correct answer, and then organize the results accordingly.
    </h1>
  )}

const PropBets = () => {
  const [docIdInput, setDocIdInput] = useState('');
  const [docId, setDocId] = useState('');
  const [isInstructionMode, setInstructionMode] = useState(false);
  const initiateScoreCalculation = () => {
    setDocId(docIdInput);
    setDocIdInput('');
  }
  return (
    <main className='flex min-h-screen flex-col items-center align-middle font-mono'>
      <div className='py-4'>
        <h2 className='mb-3 text-4xl font-semibold italic'>Prop Bets</h2>
      </div>

      {isInstructionMode ? 
          <Modal isOpen={isInstructionMode} 
            closeModal={() => setInstructionMode(false)}
            title="How Prop Bets Works"
            body={instructions}
          />
        :
        <div>
          <div className='p-2 py-4 text-center' >
            <div className= 'text-sm text-slate-500 italic hover:text-black cursor-help' onClick={()=>setInstructionMode(true)}>How does this work?</div>
          </div>
          <div className='outline p-2 flex items-center rounded-lg space-x-2'> 
            <input 
              placeholder='Enter google doc id'
              className='grow'
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
        </div>   
    }
      
    </main>
    
  );
};

export default PropBets;
