import "./App.css";
import Home from "./components/Home";
import Landing from "./components/Landing";
import Form from "./components/Form";
import Detail from "./components/Detail";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/form" component={Form} />
      <Route exact path="/detail/:id" component={Detail} />
    </div>
  );
}

export default App;
