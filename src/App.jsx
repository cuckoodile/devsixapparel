import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <div className="bg-background h-screen w-screen flex flex-col overflow-x-hidden">
      <Header />

      <div className="h-full flex justify-center text-center">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
