import { useState, useEffect } from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);

  // Load todos from LocalStorage on mount
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
  }, []);

  // Save todos to LocalStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Request notification permission and set up reminders
  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }

    const checkReminders = () => {
      const now = new Date();
      todos.forEach(todo => {
        if (todo.dueDate && new Date(todo.dueDate) <= now && !todo.completed) {
          new Notification(`Reminder: ${todo.text}`, {
            body: `Due: ${new Date(todo.dueDate).toLocaleString()}`,
            icon: '/favicon.ico' // Optional: Add an icon
          });
        }
      });
    };

    const interval = setInterval(checkReminders, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [todos]);

  const addTodo = (todo) => {
    setTodos([...todos, { ...todo, id: Date.now() }]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const reorderTodos = (newTodos) => {
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <h1>Smart To-Do App</h1>
      <AddTodo onAdd={addTodo} />
      <TodoList 
        todos={todos} 
        onDelete={deleteTodo} 
        onToggleComplete={toggleComplete} 
        onReorder={reorderTodos} 
      />
    </div>
  );
}

export default App;