import { Routes, Route, BrowserRouter } from "react-router-dom";
import TodoList from './todopage';
import './todo.css'
 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoList/>} />
        
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
