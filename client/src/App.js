import "./App.css";
import Home from "./components/Home/Home";
import Landing from "./components/Landing/Landing";
import Form from "./components/Form/Form";
import PokemonDetail from "./components/Detail/PokemonDetail";
import NavBar from "./components/NavBar/NavBar";
import NotFound from "./components/NotFound/NotFound";
import { Switch, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/home" component={NavBar} />
        <Route exact path="/form" component={Form} />
        <Route exact path="/detail/:id" component={PokemonDetail} />
        <Route exact path="/error" component={NotFound} />
        <Route exact path="/*">
          <Redirect to="/error" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
