import React, { useEffect } from "react";
import AppNavbar from "./components/AppNavbar";
import TodoList from "./components/TodoList";
import { Container } from "reactstrap";
import { Provider } from "react-redux";
import { loadUser } from  './actions/authActions';
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ItemModal from "./components/ItemModal";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  });
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <Container>
          <ItemModal />
          <TodoList />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
