// Funcionalidades / Libs:
import { Routes, Route } from "react-router-dom";

// Pages:
import Login from '../pages/Login'
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import Perfil from "../pages/Perfil";
import Clientes from "../pages/Clientes";
import NewChamado from "../pages/Dashboard/newChamado";

// Components:
import PrivateRouter from "./PrivateRouter";


export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={ <Login/> } />
            <Route path="/signup" element={ <SignUp/> } />

            {/* CHAMADOS */}
            <Route path="/dashboard" element={ 
                <PrivateRouter> <Dashboard/> </PrivateRouter>  
            }/>
            <Route path="/dashboard/new-chamado" element={ 
                <PrivateRouter> <NewChamado/> </PrivateRouter>  
            }/>

            {/* PERFIL */}
            <Route path="/perfil" element={
                <PrivateRouter> <Perfil/> </PrivateRouter>
            }/> 

            {/* CLIENTES */}
            <Route path="/clientes" element={
                <PrivateRouter> <Clientes/> </PrivateRouter>
            }/>       
        </Routes>
    )
}
