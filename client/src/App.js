import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navigation from "./components/Navigation";


function App() {
  return (
    <BrowserRouter>
      <Navigation/>
      <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
