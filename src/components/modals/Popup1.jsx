import { useState } from "react";

export default function Popup1({ visibility, data }) {
  const statuses = ["Order Confirmation", "Shipping", "Received", "Done"];

  const [selectedState, setSelectedState] = useState(data?.status_name);

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
          defaultValue={data?.status_name}
          onChange={(e) => setSelectedState(e.target.value)} // Update selectedState
        >
          {statuses.map((item, index) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <button
          onClick={() => alert(selectedState)} // Alert the current selected value
          className="cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
