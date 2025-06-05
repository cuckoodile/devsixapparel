import { useState } from "react";
import usePatchTransaction from "../../api/hooks/transactions/usePatchTransaction";

export default function Popup1({ visibility, data }) {
  const statuses = ["Order Confirmation", "Shipping", "Received", "Done"];
  const [selectedState, setSelectedState] = useState(data?.status.id);

  const useUpdateTransaction = usePatchTransaction();

  const userToken = sessionStorage.getItem("user");

  const handleUpdate = (status,id) => {
    if (status && data.id) {
      useUpdateTransaction.mutate({
        data:  {status} ,
        token: userToken,
        id: id,
      }, {
        onSuccess: () => {
          visibility(false);
          alert("Transaction updated successfully");
        },
        onError: (error) => {
          console.error("Error updating transaction:", error);
          alert("Failed to update transaction");
        },
      });
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center z-20">
      <button
        className="absolute bg-black/80 inset-0 w-full h-full"
        onClick={() => visibility(false)}
      />

      <div className="bg-white flex flex-col p-6 rounded-2xl shadow-lg relative z-10">
        <h1>{data?.id ?? "no id"}</h1>
        <h1>{data?.user_email ?? "no email"}</h1>
        <select
          defaultValue={data?.status.id}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          {statuses.map((item, index) => (
            <option key={item} value={index + 1}>
              {item}
            </option>
          ))}
        </select>
        <button
          onClick={() => handleUpdate(selectedState,data.id)} 
          className="cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
