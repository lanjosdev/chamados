// Funcionalidades / Libs:
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

// Contexts:
import { AuthContext } from '../contexts/authContext';

// Assets:
import avatarImg from '../assets/avatar.png';
import { FiHome, FiUser, FiSettings } from 'react-icons/fi';

// Estilo:
import './sidebar.scss';


export function Sidebar() {
    const { user } = useContext(AuthContext);

    return (
        <aside className="Sidebar-container">
            <div className='usuario-sidebar'>
                <img src={user.avatarUrl === null ? avatarImg : user.avatarUrl} alt={`Foto do usuario ${user.nome}`} />
                <p>{user.nome}</p>
            </div> 

            <nav>
                <ul>
                    <li>
                        <NavLink to='/dashboard'>
                            <FiHome/> 
                            <span>Chamados</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/clientes'>
                            <FiUser/> 
                            <span>Clientes</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/perfil'>
                            <FiSettings/> 
                            <span>Perfil</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>                       
        </aside>        
    )
}