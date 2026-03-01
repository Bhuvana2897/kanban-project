import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Column from "./column";
const columnData = [
  { title: "To Do", id: 1 },
  { title: "In Progress", id: 2 },
  { title: "Done", id: 3 },
];

const cardData = [
  { title: "Buy a milk", columnId: 1, id: 1 },
  { title: "Mini Project", columnId: 2, id: 2 },
  { title: "javascript", columnId: 3, id: 3 },
];

const AppContext = React.createContext();

function AppProvider({ children }) {
  const [columns, setColumns] = useState(columnData);
  const [state, setState] = useState("");
  const [cards, setCards] = useState(cardData);
  const [editId, setEditId] = useState(null);

  // add new card
  const handleCard = () => {
    const newCard = {
      title: "New Card",
      columnId: 1,
      id: cards.length + 1,
    };

    setCards([...cards, newCard]);
  };

  // edit card
  const handleEdit = (id) => {
    setEditId(id); //show form by setting editid
    setState(cards.find((card) => card.id === id).title); // show title of selected card in the form
    const newCards = cards.map((card) => {
      if (card.id === id) {
        return { ...card, title: `${card.title} edited` };
      }
      return card;
    });

    setCards(newCards);
  };

  const handleSave = () => {
    const newCards = cards.map((card) => {
      if (card.id === editId) {
        return { ...card, title: state };
      }
      return card;
    });
    setCards(newCards);
    setEditId(null);
  };

  const handleDelete = (id) => {
    const newCards = cards.filter((card) => card.id !== id);
    setCards(newCards);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    setCards((prev) =>
      prev.map((card) =>
        card.id === active.id ? { ...card, columnId: over.id } : card,
      ),
    );
  };

  return (
    <AppContext.Provider
      value={{
        columns,
        setColumns,
        state,
        setState,
        cards,
        setCards,
        editId,
        setEditId,
        handleCard,
        handleEdit,
        handleSave,
        handleDelete,
        handleDragEnd,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

function App() {
  return (
    <AppProvider>
      <div style={{ padding: "20px" }}>
        <h1 className="text-center text-3xl font-bold mt-12 mb-12 text-indigo-900">
          Kanban Board
        </h1>

        <AppContext.Consumer>
          {({ editId, state, setState, handleSave }) =>
            editId && (
              <div className="flex justify-center w-full mb-6">
                <div>
                  <div>Column Title</div>
                  <input
                    type="text"
                    onChange={(e) => setState(e.target.value)}
                    value={state}
                    className="flex-grow-p3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />

                  <button
                    className=" bg-green-300 rounded-md p-4 pl-4 pr-5 ms-2.5 "
                    onClick={handleSave}
                  >
                    save
                  </button>
                </div>
              </div>
            )
          }
        </AppContext.Consumer>

        {/* add card */}
        <AppContext.Consumer>
          {({ handleCard }) => (
            <div className="flex justify-center w-full mb-6">
              <button
                className="bg-sky-400 rounded-md p-4"
                onClick={handleCard}
              >
                Add Task
              </button>
            </div>
          )}
        </AppContext.Consumer>

        <AppContext.Consumer>
          {({ columns, cards, handleEdit, handleDelete, handleDragEnd }) => (
            <div className="flex justify-center w-full mb-6">
              <DndContext onDragEnd={handleDragEnd}>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  {columns.map((column) => (
                    <Column
                      key={column.id}
                      data={column}
                      cards={cards}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                    />
                  ))}
                </div>
              </DndContext>
            </div>
          )}
        </AppContext.Consumer>
      </div>
    </AppProvider>
  );
}

export default App;
