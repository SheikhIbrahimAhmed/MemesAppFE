import { Toaster } from 'react-hot-toast';
import './App.css';
import './output.css';
import MyRouter from './routes/MyRouter';
function App() {
  return (
    <>
      <div className="backgroundImage">
        <MyRouter />
        <Toaster />
      </div>

    </>

  );
}

export default App;
