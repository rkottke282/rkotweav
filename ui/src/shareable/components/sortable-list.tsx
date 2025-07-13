import React, { FC, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { ListItem } from "./list-item";
import { AddEditItemModal } from "./add-edit-item-modal";

interface ItemType {
  id: number;
  name: string;
  completed?: boolean;
}

export const SortableList: FC = () => {
  const [state, setState] = useState<ItemType[]>([
    { id: 1, name: "shrek", completed: false },
    { id: 2, name: "fiona", completed: false },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleToggleCompleted = (id: string) => {
    setState((prev) =>
      prev.map((item) =>
        item.id.toString() === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleRemove = (id: string) => {
    setState((prev) => prev.filter((item) => item.id.toString() !== id));
  };

  const handleEdit = (id: string) => {
    setEditId(Number(id));
    setIsAdding(false);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditId(null);
    setIsAdding(true);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditId(null);
    setIsAdding(false);
  };

  const handleModalSave = (description: string) => {
    if (isAdding) {
      // Add new item
      const newId = state.length > 0 ? Math.max(...state.map(i => i.id)) + 1 : 1;
      setState(prev => [
        ...prev,
        { id: newId, name: description, completed: false }
      ]);
    } else {
      // Edit existing item
      setState((prev) =>
        prev.map((item) =>
          item.id === editId ? { ...item, name: description } : item
        )
      );
    }
    handleModalClose();
  };

  const editingItem = state.find(item => item.id === editId);

  return (
    <>
      <ReactSortable list={state} setList={setState}>
        {state.map((item) => (
          <ListItem
            key={item.id}
            id={item.id.toString()}
            description={item.name}
            completed={!!item.completed}
            onToggleCompleted={handleToggleCompleted}
            onRemove={handleRemove}
            onEdit={handleEdit}
          />
        ))}
      </ReactSortable>
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
          onClick={handleAdd}
        >
          + Add Item
        </button>
      </div>
      <AddEditItemModal
        open={modalOpen}
        initialDescription={isAdding ? "" : editingItem?.name}
        onClose={handleModalClose}
        onSave={handleModalSave}
        title={isAdding ? "Add Item" : "Edit Item"}
      />
    </>
  );
}