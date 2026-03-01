
import { useDroppable } from "@dnd-kit/core";
import DraggableCard from "./card";
 const Column = ({ data, cards, handleEdit, handleDelete }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: data.id, // IMPORTANT: column id
  });

  let filteredcards = cards.filter((card) => card.columnId === data.id);

  return (
    <div
      ref={setNodeRef}
      className="m-1 p-4"
      style={{
        width: "300px",
        
        background: isOver ? "#f0f9ff" : "#f9fafb" ,
        backgroundColor: "#e8f5e4",
       
    
      }}
    >
      <h2 style={{ textAlign: "center",  marginBottom: "10px", fontSize: "20px" , backgroundColor: "#e8f5e9"}}>
        {data.title}
      </h2>

      {filteredcards.map((card) => (
        <DraggableCard

          key={card.id}
          card={card}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default Column;