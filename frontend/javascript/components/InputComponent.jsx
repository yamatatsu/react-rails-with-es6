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

  handleChangeColorCode(e) {
    let val = e.target.value
    console.log(val);
    if (val === 'new') {
      this.props.onSelectNew();
    }
  }

  handleClickAdd() {
    this.props.onClickAdd();
    this.refs.taskName.focus();
  }

  render() {

    // カラーの入力フォーム
    let colorUserForm;
    if (this.props.colorInputMode === 'select') {
      colorUserForm = <select onChange={this.handleChangeColorCode.bind(this)}>
        <option value="none">未設定</option>
        {this.props.colors.map(code => <option value={code}>{code}</option>)}
        <option value="new">新規カラー</option>
      </select>
    } else {
      colorUserForm = <input type="text"　placeholder="#ffffff"
        value={this.props.colorCode}
        onChange={this.handleChangeColorCode.bind(this)}/>
    }

    return (
      <div>
        <input type="text" ref="taskName"
          value={this.props.inputTaskName}
          onChange={this.handleChangeTaskName.bind(this)}/>
        {colorUserForm}
        <button onClick={this.handleClickAdd.bind(this)}>追加</button>
      </div>
    );
  }
}
