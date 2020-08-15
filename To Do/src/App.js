import React from 'react';
import './App.css';
import TDC from './ToDoComponent.js';
import todosData from './todosData.js';

let todoArray = []
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: todosData,
      task: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
    this.updating = this.updating.bind(this);
  }

  addTask() {
    this.setState(prevState => {
      let temp = {
        id: todoArray.length + 1,
        text: this.state.task,
        completed: false
      }
      if (temp.text.length > 0) { todosData.push(temp); }
      return { todos: todosData, task: "" }
    });
  }

  updating(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  handleChange(id) {
    console.log("Changed ", id);
    this.setState(prevState => {
      const updatedTodos = prevState.todos.map(todo => {
        if (todo.id === id) { todo.completed = !todo.completed; }
        return todo;
      });
      return { todos: updatedTodos }
    });
  }

  render() {
    todoArray = this.state.todos.map(item => <TDC key={item.id} item={item} handleChange={this.handleChange} />);
    return (
      <div className="todo-list" >
        <form>
          <input name="task" type="text" placeholder="Type task name" onChange={this.updating} />
        </form>
        <button onClick={this.addTask}>Add Task</button>
        {todoArray}
      </div>
    )
  }
}

export default App;