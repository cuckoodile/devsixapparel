import { useState } from "react";


export default function Dialog({ visibility, data, display = {} }) {
  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center z-20">
      <button
        className="absolute bg-black/80 inset-0 w-full h-full"
        onClick={() => visibility(false)}
      />

      <div className="bg-white flex flex-col p-6 rounded-2xl shadow-lg relative z-10">
        <p>{display?.message || "No message!"}</p>
        <div className="flex gap-5 justify-center">
          <button className="bg-red-700 py-3 px-6 rounded-lg border">
            Yes
          </button>
          <button className="bg-blue-700 py-3 px-6 rounded-lg border">
            No
          </button>
        </div>
      </div>
    </div>
  );
}
