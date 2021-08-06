const r = React.createElement;

class TestButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false };
  }

  render() {
    if (this.state.clicked)
      return 'Clicked button.';

    return r (
      'button',
      { onClick: () => this.setState({ clicked: true }) },
      'Clicked'
    );
  }
}

const bContainer = document.getElementById('#button_container');
ReactDOM.render(r(TestButton), bContainer);