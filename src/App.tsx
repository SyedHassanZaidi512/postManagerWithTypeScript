import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import * as React from "react";
import Bar from "./components/Bar";
import { useEffect } from "react";
import PostList from "./components/PostList";
import FavouriteList from "./components/FavouriteList";
import { useDispatch } from "react-redux";
import { getPostsData } from "./redux/postSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/posts/");
      dispatch(getPostsData(res.data.posts));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Router>
      <div className="App">
        <Bar />

        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/favourite" element={<FavouriteList />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
