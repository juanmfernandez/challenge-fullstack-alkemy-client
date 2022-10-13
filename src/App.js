import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from './Components/List.js';
import  Provider  from './Components/Providers';
import NotFound from './Components/NotFound';
import Create from './Components/Create';
import Edit from './Components/Edit';
import Delete from './Components/Delete';
import Login from './Components/Login';


function App() {
  const isLogged = window.localStorage.getItem("isLogged");
  return (
    <BrowserRouter>
      <Provider value={ isLogged }>
        <Routes>
          <Route path="/"  element={ <List /> }>
            <Route index element={ <Login /> } />
            <Route path="*" element={<NotFound />} />
            <Route path="/new-entry" element={<Create />} />
            <Route path="/login" element={<Login />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/delete/:id" element={<Delete />} />
          </Route>
        </Routes>      
      </Provider>
  </BrowserRouter>
  );
}

export default App;
