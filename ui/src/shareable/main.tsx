import React from 'react';
import { useState } from 'react';
import { generateRandomKey } from './functions/word-generator';

const Shareable: React.FC = () => {
    const [showCreateDropdown, setShowCreateDropdown] = useState(false);
    const [showFindDropdown, setShowFindDropdown] = useState(false);
    const [shareableId, setShareableId] = useState('');
    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <div style={{ maxWidth: '80% ', width: '100%', textAlign: 'center', gap: '4rem' }} className="flex flex-col items-center">
                <div>
                    <h1 className={`mb-3 text-4xl font-semibold`}>Shareables</h1>
                    <p>Would you like to create a new shareable or find an existing one?</p>
                    <div className="flex justify-center gap-8 mt-8 w-full">
                        <div className="relative">
                            <button
                                ref={button => {
                                    // Attach ref to button for outside click detection
                                    if (button && showFindDropdown) {
                                        const handleClick = (e: MouseEvent) => {
                                            if (
                                                !button.contains(e.target as Node) &&
                                                !(document.getElementById('create-dropdown')?.contains(e.target as Node))
                                            ) {
                                                setShowCreateDropdown(false);
                                            }
                                        };
                                        document.addEventListener('mousedown', handleClick);
                                        return () => {
                                            document.removeEventListener('mousedown', handleClick);
                                        };
                                    }
                                }}
                                onClick={() => setShowCreateDropdown((prev) => !prev)}
                                className="group rounded-lg border px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                            >
                                Create new Shareable
                            </button>
                            {showCreateDropdown && (
                                <div
                                    id='create-dropdown'
                                    style={{
                                        position: 'absolute',
                                        top: '110%',
                                        left: 0,
                                        background: 'white',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '0.375rem',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                        minWidth: '160px',
                                        zIndex: 10
                                    }}
                                    className="flex flex-col"
                                >
                                    <button
                                        className="px-4 py-2 hover:bg-gray-100 text-left"
                                        onClick={() => {
                                            setShowCreateDropdown(false);
                                            // handle 'List' selection here
                                            const id = generateRandomKey();
                                            window.location.href = `/shareables/list/${id}`;
                                        }}
                                    >
                                        List
                                    </button>
                                    <button
                                        className="px-4 py-2 hover:bg-gray-100 text-left"
                                        onClick={() => {
                                            setShowCreateDropdown(false);
                                            // handle 'Note' selection here
                                            const id = generateRandomKey();
                                            window.location.href = `/shareables/note/${id}`;
                                        }}
                                    >
                                        Note
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <button
                                ref={button => {
                                    // Attach ref to button for outside click detection
                                    if (button && showFindDropdown) {
                                        const handleClick = (e: MouseEvent) => {
                                            if (
                                                !button.contains(e.target as Node) &&
                                                !(document.getElementById('find-dropdown')?.contains(e.target as Node))
                                            ) {
                                                setShowFindDropdown(false);
                                            }
                                        };
                                        document.addEventListener('mousedown', handleClick);
                                        return () => {
                                            document.removeEventListener('mousedown', handleClick);
                                        };
                                    }
                                }}
                                onClick={() => setShowFindDropdown((prev) => !prev)}
                                className="group rounded-lg border px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                            >
                                Find existing Shareable
                            </button>
                            {showFindDropdown && (
                                <div
                                    id="find-dropdown"
                                    style={{
                                        position: 'absolute',
                                        top: '110%',
                                        left: 0,
                                        background: 'white',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '0.375rem',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                        minWidth: '220px',
                                        zIndex: 10,
                                        padding: '1rem'
                                    }}
                                    className="flex flex-col gap-2"
                                >
                                    <input
                                        type="text"
                                        placeholder="Enter Shareable ID"
                                        value={shareableId}
                                        onChange={(e) => setShareableId(e.target.value)}
                                        className="border px-2 py-1 rounded"
                                    />
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded"
                                        onClick={() => {
                                            setShowFindDropdown(false);
                                            window.location.href = `/shareables/${shareableId}`;
                                        }}
                                    >
                                        Find
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shareable;