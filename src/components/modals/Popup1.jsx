export default function Popup1({visibility}) {
  return (
    <div className="absolute top-0 left-0 min-w-full min-h-full flex items-center justify-center">
      <button className="absolute bg-black/80 top-0 left-0 w-full h-full" onClick={() => visibility(false)} />

      <div className="bg-white p-6 rounded shadow-lg relative z-10">
        <h1>Popup 1</h1>
        <p>This is the content of Popup 1.</p>
        <button onClick={() => alert("Button in Popup 1 clicked!")}>
          Click Me
        </button>
      </div>
    </div>
  );
}
