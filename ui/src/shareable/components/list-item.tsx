import React, { FC } from 'react';

interface ListItemProps {
    id: string;
    description: string;
    completed: boolean;
    onToggleCompleted?: (id: string) => void;
    onRemove?: (id: string) => void;
    onEdit?: (id: string) => void;
}

export const ListItem: FC<ListItemProps> = ({
    id,
    description,
    completed,
    onToggleCompleted,
    onRemove,
    onEdit
}) => {
    return (
        <div
            className="flex items-center justify-between w-full p-2 border-b"
            style={{ gap: '1rem' }}
        >
            <input
                type="checkbox"
                checked={completed}
                onChange={() => onToggleCompleted?.(id)}
                className="mr-2"
            />
            <span className="flex-1 text-left" 
                style={{ cursor: 'move' }}>{description}</span>
            <div className="flex gap-2">
                <button
                    className="px-2 py-1 bg-yellow-200 rounded hover:bg-yellow-300"
                    onClick={() => onEdit?.(id)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13zm0 0V17h4" />
                    </svg>
                </button>
                <button
                    className="px-2 py-1 bg-red-200 rounded hover:bg-red-300"
                    onClick={() => onRemove?.(id)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-7 0h10" />
                    </svg>
                </button>
            </div>
        </div>
    );
};