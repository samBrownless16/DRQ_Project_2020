import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import { Navigation } from './components/navigation';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation></Navigation> {/* Component should be visible at all times (Navbar) */}
      </div>
    );
  }
}

export default App;