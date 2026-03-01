import { CSS } from "@dnd-kit/utilities";
import { HiMiniPencil } from "react-icons/hi2";
import { FaTrash } from "react-icons/fa";
import { useDraggable} from "@dnd-kit/core";
const DraggableCard = ({ card, handleEdit, handleDelete }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: card.id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    padding: "12px",
    marginBottom: "10px",
    background: "#f0f9ff",
    border: "2px solid black",
    borderRadius: "4px",
    cursor: "move",
  };

  return (
    <div  className="relative" ref={setNodeRef} style={style}>
      <div {...listeners} {...attributes}>
        <p>{card.title}</p>
      </div>

      <div className="absolute bottom-0 right-0 flex items-center p-4 justify-between" >
      
    <button className="mr-2" onClick={() => handleEdit(card.id)}><HiMiniPencil  /></button>
      <button onClick={() => handleDelete(card.id)}>< FaTrash className="text-red-600" /></button>
      </div>

    </div>
  );
};
export default DraggableCard;