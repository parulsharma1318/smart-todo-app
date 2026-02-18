import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TodoItem from './TodoItem';

function TodoList({ todos, onDelete, onToggleComplete, onReorder }) {
  const [filter, setFilter] = useState('All');

  const filteredTodos = filter === 'All' 
    ? todos 
    : todos.filter(todo => todo.category === filter);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(filteredTodos);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    onReorder(reordered); // Update the full list order
  };

  return (
    <div className="todo-list">
      <div className="filter">
        <label>Filter by Category: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Urgent">Urgent</option>
        </select>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <div 
              className="todos" 
              {...provided.droppableProps} 
              ref={provided.innerRef}
            >
              {filteredTodos.length === 0 ? (
                <p>No tasks yet. Add one above!</p>
              ) : (
                filteredTodos.map((todo, index) => (
                  <Draggable 
                    key={todo.id} 
                    draggableId={todo.id.toString()} 
                    index={index}
                  >
                    {(provided) => (
                      <div 
                        ref={provided.innerRef} 
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps}
                      >
                        <TodoItem 
                          todo={todo} 
                          onDelete={onDelete} 
                          onToggleComplete={onToggleComplete} 
                        />
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default TodoList;