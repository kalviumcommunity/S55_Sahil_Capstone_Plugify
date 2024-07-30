import './App.css'
import Contact from './Components/HomePage/Contact/Contact';
import ParentComponent from './Components/ParentComponent/ParentComponent';
import Dashboard from './Components/ListingPage/Dashboard/Dashboard'
import AddForm from './Components/ListingPage/AddEntity/addForm'
import Update from './Components/ListingPage/Dashboard/Update'
import { Routes, Route } from "react-router-dom";
import Login from './Components/SignUp/SignUp';

export default function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<ParentComponent />} />
          <Route path="/contact" element={<Contact />}/>
          <Route path='/signup' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/addentity' element={<AddForm/>}/>
          <Route path="/update/:id" element={<Update/>}/>
      </Routes>
    </div>
  );
}