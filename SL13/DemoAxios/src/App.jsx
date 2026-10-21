import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AxiosDemo from './components/AxiosDemo';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';

function App() {
  return (
    <React.StrictMode>
      <div className="container mt-4">
        <AxiosDemo />
        <hr />
        <PostList />
        <hr />
        <CreatePost />
      </div>
    </React.StrictMode>
  );
}

export default App;