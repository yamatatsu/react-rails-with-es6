export default class InputComponent extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.refs.taskName.focus();
  }

  handleChangeTaskName(e) {
    this.props.onChangeTaskName({task_name: e.target.value});
  }

  handleClickAdd() {
    this.props.onClickAdd();
    this.refs.taskName.focus();
  }

  render() {
    return (
      <div>
        <input type="text" ref="taskName"
          value={this.props.inputTaskName}
          onChange={this.handleChangeTaskName.bind(this)}/>
        <button onClick={this.handleClickAdd.bind(this)}>追加</button>
      </div>
    );
  }
}
