import React, { FC, useState, useEffect } from "react";

interface AddEditItemModalProps {
    open: boolean;
    initialDescription?: string;
    onClose: () => void;
    onSave: (description: string) => void;
    title?: string;
}

export const AddEditItemModal: FC<AddEditItemModalProps> = ({
    open,
    initialDescription = "",
    onClose,
    onSave,
    title = "Add Item"
}) => {
    const [description, setDescription] = useState(initialDescription);

    useEffect(() => {
        setDescription(initialDescription);
    }, [initialDescription, open]);

    if (!open) return null;

    const handleSave = () => {
        if (description.trim()) {
            onSave(description.trim());
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSave();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded shadow-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                <input
                    type="text"
                    className="w-full border rounded px-3 py-2 mb-4"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter description"
                    autoFocus
                />
                <div className="flex justify-end gap-2">
                    <button
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                        onClick={onClose}
                        type="button"
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                        onClick={handleSave}
                        type="button"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}