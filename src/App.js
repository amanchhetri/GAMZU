import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
//import Header from "./components/common/Header";
import GamesList from "./components/gamesList/GamesList";
import NotFound from "./components/notFound/NotFound";
import Detail from "./components/detail/Detail";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          {/* <Header /> */}
          <Switch>
            <Route path="/" component={GamesList} exact />
            <Route path="/games/:name" component={Detail} exact />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
