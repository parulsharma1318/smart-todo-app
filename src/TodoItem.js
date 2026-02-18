import { format } from 'date-fns';

function TodoItem({ todo, onDelete, onToggleComplete }) {
  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleComplete(todo.id)}
      />
      <div className="todo-content">
        <span className="text">{todo.text}</span>
        <span className="category" data-category={todo.category}>{todo.category}</span>
        {todo.dueDate && (
          <span className="due-date">
            Due: {format(new Date(todo.dueDate), 'MMM dd, yyyy')}
          </span>
        )}
      </div>
      <button className="delete-btn" onClick={() => onDelete(todo.id)}><i className="fas fa-trash"></i> Delete</button>
    </div>
  );
}

export default TodoItem;