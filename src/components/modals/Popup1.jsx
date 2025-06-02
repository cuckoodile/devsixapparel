export default function Popup1({ visibility }) {
  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center z-20">
      <button
        className="absolute bg-black/80 inset-0 w-full h-full"
        onClick={() => visibility(false)}
      />

      <div className="bg-white p-6 rounded-2xl shadow-lg relative z-10">
        <h1>Popup 1</h1>
        <p>This is the content of Popup 1.</p>
        <button onClick={() => alert("Button in Popup 1 clicked!")} className="cursor-pointer">
          Click Me
        </button>
      </div>
    </div>
  );
}
