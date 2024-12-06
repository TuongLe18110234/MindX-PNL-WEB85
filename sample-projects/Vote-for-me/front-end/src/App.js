import { useCallback, useEffect, useReducer } from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import axios from "axios";

import AppReducer from "./reducers/AppReducer"
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Header from "./components/Layout/Header";
import Post from "./components/Post/Post";
import AppContext from "./store/AppContext";

function App() {
  const initialSate = {user: null, comments: [], votes: [], post: { id: "614fcec5822cd632b437992b" }};
  const [state, dispatch] = useReducer(AppReducer, initialSate);

  const checkCurrentUser = useCallback( async () => {
    try {
      const token = localStorage.getItem("token");
      
      const option = {
        method: "get",
        url: "http://localhost:8080/api/v1/auth",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios(option);

      if(response.data.data.user) {
        const {userId, userName} = response.data.data.user;
        dispatch({type: "CURRENT_USER", payload: {userId, userName}});
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    checkCurrentUser();
  }, [checkCurrentUser]);

  return (
    <Router>
      <AppContext.Provider value={{ state, dispatch }}>
        <div className="container">
            <Header />
            <Switch>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/register">
                <Register />
              </Route>
              <Route exact path="/">
                <Post />
              </Route>
              <Route exact path="*">
                <div>Page Not Found</div>
              </Route>
            </Switch>
        </div>
      </AppContext.Provider>
    </Router>
  );
}

export default App;
