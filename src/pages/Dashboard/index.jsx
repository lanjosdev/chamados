// Funcionalidades / Libs:
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../services/firebaseConnection';
import { collection, getDocs, orderBy, limit, startAfter, query } from 'firebase/firestore';

// Contexts:
// import { AuthContext } from '../../contexts/authContext'

// Components:
import { Sidebar } from '../../components/Sidebar';
import { Title } from '../../components/Title';
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from 'react-icons/fi';
import { format } from 'date-fns';

// Estilos:
// import '../pages.scss';
import './dashboard.scss';


export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [chamados, setChamados] = useState([]);

  const [lastDoc, setLastDoc] = useState();
  const [loadingMore, setLoadingMore] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const navigate = useNavigate();

  useEffect(()=> {
    async function buscaChamados() {
      const collectionRef = collection(db, "chamados");

      const q = query(collectionRef, orderBy('criado', 'desc'), limit(5)); // vai pegar um maximo de 5 itens
      const querySnapshot = await getDocs(q);

      await updateChamados(querySnapshot);

      setLoading(false);
    }
    buscaChamados();
  }, []);

  async function updateChamados(querySnap) {
    const isChamadosEmpty = querySnap.size === 0; // true OR false

    if(isChamadosEmpty) {
      console.log('NÃO TEM MAIS CHAMADOS!');
      setIsEmpty(true);
    } else {
      let listaChamados = [];

      // Irá organizar/filtar os dados que o snapshot retorna:
      querySnap.forEach((chamado)=> {
        listaChamados.push({
          id: chamado.id,
          cliente: chamado.data().cliente,
          clienteId: chamado.data().clienteId,
          assunto: chamado.data().asssunto,
          status: chamado.data().status,
          criado: chamado.data().criado,
          criadoFormat: format(chamado.data().criado.toDate(), 'dd/MM/yyyy'),
          complemento: chamado.data().complemento,
        })
      })

      let lastItem = querySnap.docs[querySnap.docs.length - 1] //pega o ultimo item da array

      setLastDoc(lastItem);
      // setChamados(listaChamados);
      setChamados(chamados => [...chamados, ...listaChamados]);
    }

    setLoadingMore(false);
  }

  async function handleBuscaMore() {
    setLoadingMore(true);
    const collectionRef = collection(db, "chamados");

    const q = query(collectionRef, orderBy('criado', 'desc'), startAfter(lastDoc), limit(5)); // vai pegar um maximo de 5 itens a partir de tal doc (startAfter)
    const querySnapshot = await getDocs(q);
    await updateChamados(querySnapshot);
  }

  return(
    <main className='Container'>

      <Sidebar/>

      <div className="page-content">
        <Title titulo="Chamados">
            <FiMessageSquare size={25}/>
        </Title>
        
        <div className="Dashboard-container">

          {loading ? (
            <p>Buscando chamados...</p>
          ) : (
            chamados.length === 0 ? (
              <div className="not-chamados">
                <p>Nenhum chamado registrado!</p>
                
                <Link to='new-chamado' className='new-chamado'>
                  <FiPlus size={25} />
                  <span>Novo chamado</span>
                </Link>
              </div>
            ) : (
              <>
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

                  {chamados.map((chamado, index)=> (
                    <tr key={index}>
                      <td data-label="Cliente">{chamado.cliente}</td>
                      <td data-label="Assunto">{chamado.assunto}</td>
                      <td data-label="Status">
                        <span 
                          className="badge" 
                          style={{backgroundColor: chamado.status === 'Aberto' ? '#5cb85c' : chamado.status === 'Atendido' ? '#999' : '#1a449e' }}
                        >
                          {chamado.status}
                        </span>
                      </td>
                      <td data-label="Cadastrado em">
                        {chamado.criadoFormat}
                      </td>

                      <td data-label="Ações">
                        <div className="actions">
                          <button className="action" style={{ backgroundColor: '#3583f6' }}>
                            <FiSearch color='#FFF' size={17}/>
                          </button>
                          <button 
                            className="action" 
                            onClick={()=> navigate(`edit-chamado/${chamado.id}`)}
                            style={{ backgroundColor: '#f6a935' }}
                          >
                            <FiEdit2 color='#FFF' size={17}/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  

                </tbody>
              </table>
              
              {!isEmpty && (
                <>
                  {loadingMore ? (
                    <button className='btn-more clicado'>
                      Buscando...
                    </button>
                  ) : (
                    <button
                      className='btn-more'
                      onClick={handleBuscaMore}
                    >
                      Buscar mais
                    </button>
                  )}
                </>
              )}
              </>
            )
          )}
      
        </div>
      </div>
      
    </main>
  )
}