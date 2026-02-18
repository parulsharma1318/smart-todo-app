import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function AddTodo({ onAdd }) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('Personal');
  const [dueDate, setDueDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd({ text: text.trim(), category, dueDate, completed: false });
    setText('');
    setDueDate(null);
  };

  return (
    <form className="add-todo" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task"
        required
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
        <option value="Urgent">Urgent</option>
      </select>
      <DatePicker
        selected={dueDate}
        onChange={setDueDate}
        placeholderText="Select due date (optional)"
        dateFormat="yyyy-MM-dd"
        isClearable
      />
      <button type="submit"><i className="fas fa-plus"></i> Add Task</button>
    </form>
  );
}

export default AddTodo;