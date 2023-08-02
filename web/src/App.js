import './App.css';
import { useRoutes } from 'react-router-dom';
import routes from './router'
function Routes() {
  return useRoutes(routes);
}

function App() {
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
