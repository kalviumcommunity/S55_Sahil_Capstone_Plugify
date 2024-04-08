import './App.css'
import Contact from './Components/HomePage/Contact/Contact';
import ParentComponent from './Components/ParentComponent/ParentComponent';
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<ParentComponent />} />
          <Route path="/contact" element={<Contact />}/>
      </Routes>
    </div>
  );
}