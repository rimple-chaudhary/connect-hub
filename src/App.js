import './App.css';
import RoutesData from './routes/Routes';
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./common.scss"


function App() {
  return (
    <div className="App">
   
      <RoutesData/>
   
    
     <ToastContainer
        icon={true}
        theme="colored"
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={true}
        closeButton={false}
        newestOnTop
      />
    </div>
  );
}

export default App;
