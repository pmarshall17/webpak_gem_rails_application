import React from 'react';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] }
  }

  componentWillMount() {
    $.ajax({
      url: '/api/items',
      type: 'GET'
    }).done( todos => {
      this.setState({ todos })
    })
  }

  updateTodo(id) {
    $.ajax({
      url: `/api/items/${id}`,
      type: 'PUT'
    }).done( item => {
      let todos = this.state.todos;
      let index = todos.findIndex( i => i.id === item.id);
      this.setState({
        todos: [
          ...todos.slice(0, index),
          {...item},
          ...todos.slice(index + 1, todos.length)
        ]
      })
    })
  }

  deleteTodo(id) {
    $.ajax({
      url: `/api/items/${id}`,
      type: 'DELETE'
    }).done( () => {
      let todos = this.state.todos;
      let index = todos.findIndex( i => i.id === id );
      this.setState({
        todos: [
          ...todos.slice(0, index),
          ...todos.slice(index + 1, todos.length)
        ]
      })
    })
  }

  updateList(name) {
    $.ajax({
      url: '/api/items',
      type: 'POST',
      data: { item: { name }}
    }).done( todo => {
      this.setState({
        todos: [
          {...todo},
          ...this.state.todos
        ]
      })
    });
  }

  render() {
    return (
      <div className="container">
        <AddTodo updateList={this.updateList.bind(this)} />
        <TodoList
          todos={this.state.todos}
          updateTodo={this.updateTodo.bind(this)}
          deleteTodo={this.deleteTodo.bind(this)}
        />
      </div>
    )
  }
}

export default App;

