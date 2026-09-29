import { useState } from 'react';
import './4_TodoList.css';

function TodoList() {
  // Khởi tạo danh sách với 2 mục mẫu giống ảnh đề bài
  const [todos, setTodos] = useState([
    'Học lập trình .NET',
    'Học lập trình Java',
  ]);
  const [task, setTask] = useState('');

  // Xử lý thêm công việc mới
  const handleAddTodo = (e) => {
    e.preventDefault();
    const trimmed = task.trim();
    if (!trimmed) return;
    setTodos((prevTodos) => [...prevTodos, trimmed]);
    setTask('');
  };

  // Xử lý xóa công việc theo vị trí index
  const handleDelete = (indexToDelete) => {
    setTodos((prevTodos) => prevTodos.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="todo-wrapper">
      <div className="todo-layout">
        {/* Form nhập liệu & nút thêm */}
        <form className="todo-input-form" onSubmit={handleAddTodo}>
          <input
            type="text"
            className="todo-input"
            placeholder="Please input a Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button type="submit" className="btn-add-todo">
            Add Todo
          </button>
        </form>

        {/* Khung hiển thị danh sách Todo List */}
        <div className="todo-card">
          <h2 className="todo-title">Todo List</h2>

          <div className="todo-items-list">
            {todos.length === 0 ? (
              <p className="todo-empty">No tasks yet</p>
            ) : (
              todos.map((item, index) => (
                <div key={index} className="todo-item">
                  <span className="todo-item-text">{item}</span>
                  <button
                    type="button"
                    className="btn-delete-todo"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
