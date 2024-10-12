import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Newtask from "./components/Newtask";
import Taskbox from "./components/Taskbox";

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <div className="content pt-32 pb-28">
          <Taskbox />
          <Newtask />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
