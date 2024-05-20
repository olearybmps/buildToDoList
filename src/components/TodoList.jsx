import React, { useState } from 'react';
import './TodoList.css';
import { initialState } from '../models/ToDoItems';

function TodoItem({ todo, onToggleComplete, onDelete, onEdit }) {
    const [isEdit, setIsEdit] = useState(false);
    const [editText, setEditText] = useState(todo.title);

    const handleEdit = () => {
        setIsEdit(true);
        setEditText(todo.title);
    };

    const handleSave = () => {
        onEdit(todo.id, editText);
        setIsEdit(false);
    };

    const handleDelete = () => {
        onDelete(todo.id);
    };

    const handleTextChange = (event) => {
        setEditText(event.target.value);
    };

    return (
        <li>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggleComplete(todo.id)}
            />
            {isEdit ? (
                <input
                    type="text"
                    value={editText}
                    onChange={handleTextChange}
                />
            ) : (
                <span
                    style={{
                        textDecoration: todo.completed
                            ? 'line-through'
                            : 'none',
                    }}
                >
                    {todo.title}
                </span>
            )}
            <button disabled={!todo.completed} onClick={handleDelete}>
                Delete
            </button>
            {isEdit ? (
                <button onClick={handleSave}>Save</button>
            ) : (
                <button onClick={handleEdit}>Edit</button>
            )}
        </li>
    );
}

function TodoList({ todos, onToggleComplete, onDelete, onEdit }) {
    return (
        <ul>
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggleComplete={onToggleComplete}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </ul>
    );
}

function App() {
    const [todos, setTodos] = useState(initialState);

    const addTodo = (text) => {
        setTodos([
            {
                userId: 1,
                id: Math.max(...todos.map((todo) => todo.id)) + 1,
                title: text,
                completed: false,
            },
            ...todos,
        ]);
    };

    const handleToggleComplete = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const handleDelete = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleEdit = (id, newText) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, title: newText } : todo
            )
        );
    };

    return (
        <div className="todo-list">
            <h1>Todo List</h1>
            <input
                type="text"
                placeholder="Add a new todo"
                onKeyUp={(e) => e.key === 'Enter' && addTodo(e.target.value)}
            />
            <TodoList
                todos={todos}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />
        </div>
    );
}

export default App;
