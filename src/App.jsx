// Funcionalidades / Libs:
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Contexts Providers:
import AuthProvider from './contexts/authContext';

// Components:
import AppRoutes from './routes'; //Config de rotas

// Estilo Global:
import './styles/global.scss';


export default function App() {

  return (
    <BrowserRouter>  

      <AuthProvider>
        <ToastContainer autoClose={3000} />
        <AppRoutes/>
      </AuthProvider>

    </BrowserRouter>
  )
}