import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, updateTodo, deleteTodo }) => {
  let items = todos.map( todo => {
    return (<Todo key={todo.id} {...todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />)
  })

  return (
    <div className="row">
      {items}
    </div>
  )
}

export default TodoList;

