import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AxiosDemo from './components/AxiosDemo';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import UpdatePost from './components/UpdatePost';
import PatchPost from './components/PatchPost';
import DeletePost from './components/DeletePost';

function App() {
  return (
    <React.StrictMode>
      <div className="container mt-4">
        <AxiosDemo />
        <hr />
        <PostList />
        <hr />
        <CreatePost />
        <hr />
        <UpdatePost />
        <hr />
        <PatchPost />
        <hr />
        <DeletePost />
      </div>
    </React.StrictMode>
  );
}

export default App;
