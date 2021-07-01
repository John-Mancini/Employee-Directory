import Table from "./components/Table/Table.jsx";
import "./App.css";
import "./components/Table/Table.css";

function App() {
  return (
    <div className="App container-fluid">
      <div class="p-5 mb-4 bg-light rounded-3">
        <div class="container-fluid py-5">
          <h1 class="display-5 fw-bold">Employee Directory</h1>
        </div>
      </div>
      {/* <div className="btn btn-primary"></div> */}
      <Table />
    </div>
  );
}

export default App;
