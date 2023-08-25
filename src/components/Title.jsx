// Funcionalidades / Libs:
import { useContext } from 'react';

// Contexts:
import { AuthContext } from '../contexts/authContext';

// Estilo:
import './title.scss';


export function Title({ children, titulo }) {
    
    return (
        <h1 className='Title'>
            {children}
            <span>{titulo}</span>
        </h1>
    )
}