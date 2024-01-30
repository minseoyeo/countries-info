import { BrowserRouter } from "react-router-dom";
import Logo from "./components/Logo";
import Pages from "./pages/Pages";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Logo />
        <Pages/>
      </BrowserRouter>
    </div>
  );
}

export default App;
