import { BrowserRouter, Routes, Route } from "react-router-dom";
import Operator from "./pages/operator";
import Monitor from "./pages/monitor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Operator />} />

        <Route path="/monitor" element={<Monitor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
