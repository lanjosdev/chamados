// Funcionalidades / Libs:
// import { useContext } from 'react'
import { Link } from 'react-router-dom';

// Contexts:
// import { AuthContext } from '../../contexts/authContext'

// Components:
import { Sidebar } from '../../components/Sidebar';
import { Title } from '../../components/Title';
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from 'react-icons/fi';

// Estilos:
import '../pages.scss';
import './dashboard.scss';


export default function Dashboard() {
  // const { logout } = useContext(AuthContext);

  // async function handleLogout(){
  //   await logout();
  // }

  return(
    <main className='Container'>

      <Sidebar/>

      <div className="page-content">
        <Title titulo="Chamados">
            <FiMessageSquare size={25}/>
        </Title>
        
        <div className="Dashboard-container">
          <Link to='new-chamado' className='new-chamado'>
            <FiPlus size={25} />
            <span>Novo chamado</span>
          </Link>

          <table>
            <thead>
              <tr>
                <th scope="col">Cliente</th>
                <th scope="col">Assunto</th>
                <th scope="col">Status</th>
                <th scope="col">Cadastrado em</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Cliente">Mercado Plus</td>
                <td data-label="Assunto">Suporte</td>
                <td data-label="Status">
                  <span className="badge" style={{backgroundColor: '#999'}}>
                    Em Aberto
                  </span>
                </td>
                <td data-label="Cadastrado em">12/05/2022</td>
                <td data-label="Ações">
                  <div className="actions">
                    <button className="action" style={{ backgroundColor: '#3583f6' }}>
                      <FiSearch color='#FFF' size={17}/>
                    </button>
                    <button className="action" style={{ backgroundColor: '#f6a935' }}>
                      <FiEdit2 color='#FFF' size={17}/>
                    </button>
                  </div>
                </td>
              </tr>

              <tr>
                <td data-label="Cliente">Qualydata</td>
                <td data-label="Assunto">Suporte</td>
                <td data-label="Status">
                  <span className="badge" style={{backgroundColor: '#999'}}>
                    Em Aberto
                  </span>
                </td>
                <td data-label="Cadastrado em">12/05/2022</td>
                <td data-label="Ações">
                  <div className="actions">
                    <button className="action" style={{ backgroundColor: '#3583f6' }}>
                      <FiSearch color='#FFF' size={17}/>
                    </button>
                    <button className="action" style={{ backgroundColor: '#f6a935' }}>
                      <FiEdit2 color='#FFF' size={17}/>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          
          {/* <button className='logout-btn' onClick={handleLogout}>Sair da conta</button> */}
        </div>
      </div>
      
    </main>
  )
}