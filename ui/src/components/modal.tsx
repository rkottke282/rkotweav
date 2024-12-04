'use client';
import React, { useState } from 'react';

export type TModalProps = {
    isOpen: boolean,
    closeModal: any,
    title: string,
    body: Function
};

const Modal = (props: TModalProps) => {
    return (
        <div className='container border-4 rounded-md bg-white shadow-lg mx-auto w-1/2 border-black' 
            hidden={!props.isOpen}>
                <div className='grid place-items-end pr-1 py-1'>
                    <button className='rounded-full bg-slate-200 w-1/6 text-xs p-1'
                        onClick={props.closeModal}>Close</button>
                </div>
                <div className='grid place-items-center pb-2'>
                    <h1 className='font-bold'>{props.title}</h1>
                </div>
                <div className='grid place-items-center'>
                    {props.body()}
                </div>
            
        </div>
    )
};

export default Modal;