import { useState } from "react";
import { useParams } from "react-router-dom";
import Popup1 from "../../components/modals/Popup1";

export default function Purchases() {
  const paramsId = useParams().id;

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex-1 relative">
      {isModalOpen && <Popup1 visibility={setIsModalOpen} />}

      <div>Purchases id: {paramsId}</div>

      {/* Sample product to demonstrate popup modal */}
      <div className="flex justify-center">
        <div className="w-fit p-4 border rounded shadow-lg mt-10">
          <h2>Product Name</h2>
          <p>Description of the product.</p>
          <button
            className="w-full mt-5 pt-2 border-t-1 cursor-pointer hover:bg-accent"
            onClick={() => setIsModalOpen(true)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
