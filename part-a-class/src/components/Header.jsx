import { Component } from 'react';
import Clock from './Clock';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { showClock: true };
  }

  toggleClock = () => {
    this.setState((prev) => ({ showClock: !prev.showClock }));
  };

  render() {
    return (
      <header className="header">
        <h1>Sổ chi tiêu cá nhân (Class)</h1>
        <div className="header-actions">
          {this.state.showClock && <Clock />}
          <button type="button" className="btn-secondary" onClick={this.toggleClock}>
            {this.state.showClock ? 'Ẩn đồng hồ' : 'Hiện đồng hồ'}
          </button>
        </div>
      </header>
    );
  }
}

export default Header;
