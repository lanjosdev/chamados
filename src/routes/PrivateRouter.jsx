// Funcionalidades / Libs:
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

// Contexts:
import { AuthContext } from '../contexts/authContext';

// Estilo:


export default function PrivateRouter({ children }) {
    const { logado, loading } = useContext(AuthContext);

    // if(loading) {
    //     return (
    //         <h1 className='title-loading' style={{color: 'red'}}>Carregando...</h1>
    //     )
    // } else if(logado) {
    //     return children;
    // } else {
    //     return <Navigate to='/' />        
    // }

    return (
        <>
        {loading ? (
            <h1 className='title-loading'>Carregando...</h1>
        ) : (
            
            logado ? (
                children
            ) : (
                <Navigate to='/' />
            )
        
        )}
        </>
    )    

    
}