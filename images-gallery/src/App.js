import logo from './logo.svg';
import './App.css';
import '@radix-ui/themes/styles.css';
import HomePage from './HomePage';
import Header from './Header';

function App() {
  return (
    <div className="App">
       <Header />
      <HomePage />
    </div>
  );
}

export default App;
