import './App.css';
import Blogs from './components/Blogs';
import Nav from './components/Nav';


function App() {
  return (
    <div>
      <Nav/>
      <div className="App">
        <header className="App-header">
          <Blogs/>
        </header>
      </div>
    </div>
  );
}

export default App;
