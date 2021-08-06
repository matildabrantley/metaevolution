
let r = React.createElement;
class TestButton extends React.Component {
  constructor(super_components) {
    super(super_components);
    this.state = { clicked: false };
  }

  render() {
    if (this.state.clicked) {
      return 'Clicked this.';
    }

    return r(
      'button',
      { onClick: () => this.setState({ clicked: true }) },
      'Click'
    );
  }
}

const domContainer = document.querySelector('#button_container');

ReactDOM.render(r(TestButton), domContainer);