import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from './Components/List.js';
import Provider  from './Components/Providers';

import NotFound from './Components/NotFound';

import Create from './Components/Flows/Create';
import Edit from './Components/Flows/Edit';
import Delete from './Components/Flows/Delete';

import CreateUser from './Components/Users/Create';
import Login from './Components/Users/Login';
import LogOut from './Components/Users/LogOut';
import { ProtectedRoutes } from './Components/ProtectedRoutes';
import Landing from './Components/Landing';

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <Routes>
          <Route path="/"  element={ <Landing /> }>
            <Route path="*" element={<NotFound />} />
            <Route path="/login/list" element={<List />} />
            <Route element={<ProtectedRoutes />}>
              <Route index element={ <List /> } />
              <Route path="/list" element={<List />} />
              <Route path="/new-entry" element={<Create />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/delete/:id" element={<Delete />} />            
            </Route>
            <Route path="/sign-up" element={<CreateUser />} />

            <Route path="/login" element={<Login />} />
            <Route path="/log-out" element={<LogOut />} />
          </Route>
        </Routes>      
      </Provider>
  </BrowserRouter>
  );
}

export default App;
