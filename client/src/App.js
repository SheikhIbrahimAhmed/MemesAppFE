import MyRouter from './routes/MyRouter';
import './App.css';
import './output.css';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <>
      <MyRouter />
      <Toaster />

    </>

  );
}

export default App;
