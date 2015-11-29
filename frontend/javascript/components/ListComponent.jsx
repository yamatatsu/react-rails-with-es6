class ListItem extends React.Component {
  handleClickDelete() {
    this.props.onClickDelete(this.props.task.id);
  }
  render() {
    return (
      <li>{this.props.task.title}
        <button onClick={this.handleClickDelete.bind(this)}>削除</button>
      </li>
    );
  }
}

export default class ListComponent extends React.Component {
  handleClickDelete(id) {
    this.props.onClickDelete(id);
  }
  render() {
    return (
      <ul>
        {this.props.tasks.map(task => {
          return (
            <ListItem
              key={task.id}
              task={task}
              onClickDelete={this.handleClickDelete.bind(this)}/>
          );
        })}
      </ul>
    );
  }
}
