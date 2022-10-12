import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from './Components/List.js';
import  Provider  from './Components/Providers';
import NotFound from './Components/NotFound';

function App() {
  const isLogged = window.localStorage.getItem("isLogged");
  return (
    <BrowserRouter>
      <Provider value={ isLogged }>
        <Routes>
          <Route path="/" >
            <Route index element={ <List /> } />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>      
      </Provider>
  </BrowserRouter>
  );
}

export default App;
