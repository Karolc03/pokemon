import "./App.css";
import Home from './components/Home/Home'
import Landing from "./components/Landing/Landing";
import Form from "./components/Form/Form";
import PokemonDetail from "./components/Detail/PokemonDetail";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/form" component={Form} />
      <Route exact path="/detail/:id" component={PokemonDetail} />
    </div>
  );
}

export default App;
