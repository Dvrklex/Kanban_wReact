import ColumnContainer from "./components/ContainerColumns";
import "./App.css";
function App() {
  return (
      
    <div className="app">
      <header className="app-header">
        <h1 className="titulo-kanban">Kanban</h1>
        <p>A project created with React Js</p>
      </header>
      <div className="container">
        <div className="row">
        <ColumnContainer/>  
        </div>
      </div>
    </div>
  );
}

export default App;