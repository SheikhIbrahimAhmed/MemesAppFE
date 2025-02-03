import { Toaster } from 'react-hot-toast';
import './App.css';
import './output.css';
import MyRouter from './routes/MyRouter';
function App() {
  return (
    <>
      <div className="bg-[#7EC2E7]">
        <MyRouter />
        <Toaster />
      </div>

    </>

  );
}

export default App;
