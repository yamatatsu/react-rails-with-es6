'use strict';

import {reject} from 'underscore';
import request from 'superagent';
import InputComponent from './InputComponent.jsx';
import ListComponent from './ListComponent.jsx';

class TaskEditor extends React.Component {
  constructor() {
    super();
    this.state = {tasks: [], inputTaskName: ''};
  }

  componentDidMount() {
    request
      .get('/api/tasks/')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        this.setState({tasks: res.body.tasks});
      });
  }

  handleClickAdd() {
    request
      .post('/api/tasks/')
      .send({task_name: this.state.inputTaskName.trim()})
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        this.setState({
          tasks: this.state.tasks.concat(res.body.task),
          inputTaskName: ''
        });
      });
  }

  handleChangeTaskName(input) {
    this.setState({inputTaskName: input.task_name})
  }

  handleClickDelete(id) {
    request
      .del('/api/tasks/' + id)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        this.setState({
          tasks: reject(this.state.tasks, task => task._id === res.body._id)
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
            onClickAdd={this.handleClickAdd.bind(this)}
            onChangeTaskName={this.handleChangeTaskName.bind(this)} />
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
