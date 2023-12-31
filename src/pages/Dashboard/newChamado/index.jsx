// Funcionalidades / Libs:
import { useState, useEffect, useContext } from 'react'
import { db } from '../../../services/firebaseConnection';
import { collection, getDocs, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';

// Contexts:
import { AuthContext } from '../../../contexts/authContext'

// Components:
import { Sidebar } from '../../../components/Sidebar';
import { Title } from '../../../components/Title';
import { FiPlusCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';

// Estilos:
// import '../pages.scss';
import './newchamado.scss';

// colocar uma prop de Title (se não tiver deixa outro valor ou vazio)
export default function NewChamado() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState('');

  const [assunto, setAssunto] = useState('');
  const [status, setStatus] = useState('Aberto');
  const [complemento, setComplemento] = useState('');

  const [idCliente, setIdCliente] = useState(false);
  const [isEdit ,setIsEdit] = useState(false);

  const navigate = useNavigate();


  useEffect(()=> {
    async function carregaClientes() {
      if(id) {
        setIdCliente(true);
      }
      const listRef = collection(db, "clientes");

      await getDocs(listRef)
      .then((snapshot)=> {
        let listaClientes = [];

        snapshot.forEach((cliente)=> {
          listaClientes.push({
            id: cliente.id,
            nomeFantasia: cliente.data().nomeFantasia
          })
        })

        if(snapshot.docs.size === 0) {
          console.log('NENHUMA EMPRESA REGISTRADA!');
          return;
        }

        setClientes(listaClientes);

        if(id) {
          carregaChamadoId(listaClientes);
        }
      })
      .catch((erro)=> {
        console.log('ERRO AO BUSCAR CLIENTES!', erro);
      })

      setLoading(false);
    }
    carregaClientes();
  }, [id]);

  // useEffect(()=> {
  //   function liberaEdit() {
  //     setIsEdit(true);
  //   }
  //   liberaEdit();
  // }, [clienteSelecionado, assunto, status, complemento]);

  async function carregaChamadoId(lista) {
    const docRef = doc(db, "chamados", id);

    await getDoc(docRef)
    .then((snapshot)=> {
      setAssunto(snapshot.data().asssunto);
      setStatus(snapshot.data().status);
      setComplemento(snapshot.data().complemento);

      let index = lista.findIndex(item => item.id === snapshot.data().clienteId);
      setClienteSelecionado(index);
      setIdCliente(true);
    })
    .catch((erro)=> {
      console.log('DEU ERRO!', erro);
      setIdCliente(false); //usa navigate p/ dash?
    })

  }

  async function handleSubmitAddChamado(e) {
    e.preventDefault();
    
    // Add/Create chamado no DB
    await addDoc(collection(db, "chamados"), {
      criado: new Date(),
      cliente: clientes[clienteSelecionado].nomeFantasia,
      clienteId: clientes[clienteSelecionado].id,
      asssunto: assunto,
      status: status,
      complemento: complemento,
      userId: user.uid
    })
    .then(()=> {
      toast.success('Chamado registrado!');

      setClienteSelecionado('');
      setAssunto('');
      setStatus('Aberto');
      setComplemento('');
    })
    .catch((erro)=> {
      toast.error('Erro ao registrar chamado! Tente mais tarde.');
      console.log(erro);
    })
  }

  async function handleSubmitEditChamado(e) {
    e.preventDefault();

    //if (compare) nenhum dado foi modificado > return

    // Edit/Update chamado no DB
    const docRef = doc(db, "chamados", id);

    await updateDoc(docRef, {
      cliente: clientes[clienteSelecionado].nomeFantasia,
      clienteId: clientes[clienteSelecionado].id,
      asssunto: assunto,
      status: status,
      complemento: complemento,
      userId: user.uid
    })
    .then(()=> {
      toast.success('Chamado Atualizado!');

      setClienteSelecionado('');
      // setAssunto('');
      // setStatus('Aberto');
      setComplemento('');
      navigate('/dashboard');
    })
    .catch((erro)=> {
      toast.error('Erro ao editar chamado! Tente mais tarde.');
      console.log(erro);
    })
  }



  return(
    <main className='Container'>

      <Sidebar/>

      <div className="page-content">
        <Title titulo={idCliente ? 'Editar chamado' : 'Novo chamado'}>
            <FiPlusCircle size={25}/>
        </Title>
        
        <div className="Newchamado-container">

          <form onSubmit={idCliente ? handleSubmitEditChamado : handleSubmitAddChamado}>
              <div className="input-div">
                  <label>Cliente</label>
                  {
                  loading ? (

                    <select disabled>
                      <option>Carregando...</option>
                    </select>

                  ) : (
                    clientes.length === 0 ? (

                      <select style={{color: 'red'}}>
                        <option>Nenhuma empresa registrada!</option>
                      </select>

                    ) : (

                      <select 
                        value={clienteSelecionado}
                        onChange={(e)=> setClienteSelecionado(e.target.value)} 
                        required
                      >
                        <option value=''>Selecione...</option>

                        {clientes.map((cliente, index)=> (
                          <option key={index} value={index}>
                            {cliente.nomeFantasia}
                          </option>
                        ))}
                      </select>

                    ) 
                  )
                  }
              </div>

              <div className="input-div">
                  <label htmlFor="assunto">Assunto</label>
                  <select value={assunto} onChange={(e)=> setAssunto(e.target.value)} required>
                    <option value=''>Selecione...</option>
                    <option value="Suporte">Suporte</option>
                    <option value="Visita Tecnica">Visita Tecnica</option>
                    <option value="Financeiro">Financeiro</option>
                  </select>                     
              </div>

              <div className="input-div">

                  <label>Status</label>
                  
                  <div className="radios">
                    <input 
                      type="radio"
                      name='status' 
                      id="aberto" 
                      value="Aberto"
                      checked={status === 'Aberto'}
                      onChange={(e)=> setStatus(e.target.value)}
                    />
                    <label htmlFor="aberto">Em aberto</label>

                    <input 
                      type="radio"
                      name='status' 
                      id="progresso" 
                      value="Progresso"
                      checked={status === 'Progresso'}
                      onChange={(e)=> setStatus(e.target.value)}
                    />
                    <label htmlFor="progresso">Progresso</label>

                    <input 
                      type="radio"
                      name='status' 
                      id="atendido" 
                      value="Atendido"
                      checked={status === 'Atendido'}
                      onChange={(e)=> setStatus(e.target.value)}
                    />
                    <label htmlFor="atendido">Atendido</label>                      
                  </div>

              </div>

              <div className="input-div">
                <label>Complemento</label>
                <textarea 
                  type="text" 
                  placeholder='Descreva seu problema (opcional).'
                  value={complemento}
                  onChange={(e)=> setComplemento(e.target.value)}
                ></textarea>
              </div>
              
              <button 
                type='submit'
                // melhor classe css
                // disabled={!isEdit}
              >{idCliente ? 'Editar' : 'Registrar'}</button>
          </form>

        </div>
      </div>
      
    </main>
  )
}