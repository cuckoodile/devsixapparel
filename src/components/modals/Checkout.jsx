import { useState } from "react";
import usePostTransaction from "../../api/hooks/transactions/usePatchTransaction";
import useGetTransactions from "../../api/hooks/transactions/useGetTransactions";

export default function Popup1({ visibility, data }) {
  const statuses = ["Order Confirmation", "Shipping", "Received", "Done"];
  const [selectedState, setSelectedState] = useState(data?.status.id);

  const useCreateTransaction = usePostTransaction();

  const userToken = sessionStorage.getItem("user");

  const handleUpdate = (status, id) => {
    if (status && data.id) {
      useCreateTransaction.mutate(
        {
          data: { status },
          token: userToken,
          id: id,
        },
        {
          onSuccess: () => {
            visibility(false);
            alert("Checkout successfully");
          },
          onError: (error) => {
            console.error("Error checking out", error);
            alert("Failed checkout");
          },
        }
      );
    }
  };

  const {
    data: transactionData,
    isLoading,
    isError,
  } = useGetTransactions(userToken);

  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center z-20">
      <button
        onClick={() => visibility(false)}
        className="bg-black/60 absolute inset-0 w-full h-full "
      />

      <div className="bg-white p-6 rounded-lg shadow-lg w-96 z-20">
        <h2 className="text-xl font-bold mb-4">Checkout</h2>
        <p className="mb-4">Are you sure you want to checkout?</p>
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium mb-2">
            Status
          </label>
          <select
            id="status"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            {statuses.map((status, index) => (
              <option key={index} value={index + 1}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => handleUpdate(selectedState, data.id)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Confirm Checkout
        </button>
        <button
          onClick={() => visibility(false)}
          className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
