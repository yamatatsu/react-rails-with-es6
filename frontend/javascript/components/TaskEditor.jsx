'use strict';

import {reject} from 'underscore';
import request from 'superagent';
import InputComponent from './InputComponent.jsx';
import ListComponent from './ListComponent.jsx';

class TaskEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      inputTaskName: '',
      colorCode: '',
      colorInputMode: 'select',
      colors: []
    };
  }

  componentDidMount() {
    request
      .get('/todos.json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        this.setState({tasks: res.body});
      });
  }

  handleClickAdd() {
    request
      .post('/todos.json')
      .send({title: this.state.inputTaskName.trim()})
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        this.setState({
          tasks: this.state.tasks.concat(res.body),
          inputTaskName: ''
        });
      });
  }

  handleChangeTaskName(input) {
    this.setState({inputTaskName: input.task_name})
  }

  handleSelectNew() {
    this.setState({colorInputMode: 'input'})
  }

  handleClickDelete(id) {
    request
      .del(`/todos/${id}.json`)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (!res.ok) {
          console.error(err);
          return;
        }
        this.setState({
          tasks: reject(this.state.tasks, task => task.id === id)
        });
      });
  }

  render() {
    return (
      <div>
        <header><h1>TaskEditer</h1></header>
        <section>
          <InputComponent
            inputTaskName={this.state.inputTaskName}
            colorCode={this.state.colorCode}
            colorInputMode={this.state.colorInputMode}
            colors={this.state.colors}
            onClickAdd={this.handleClickAdd.bind(this)}
            onChangeTaskName={this.handleChangeTaskName.bind(this)}
            onSelectNew={this.handleSelectNew.bind(this)} />
        </section>
        <section>
          <ListComponent
            tasks={this.state.tasks}
            onClickDelete={this.handleClickDelete.bind(this)}/>
        </section>
      </div>
    );
  }
}

window.TaskEditor = TaskEditor;
