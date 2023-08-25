// Funcionalidades / Libs:
import { useState } from 'react';

import { db } from '../../services/firebaseConnection';
import { addDoc, collection } from 'firebase/firestore';

// Components:
import { Sidebar } from '../../components/Sidebar';
import { Title } from '../../components/Title';
import { toast } from 'react-toastify';

// Assets:
import { FiUser } from 'react-icons/fi';

// Estilos:
import '../pages.scss';
import './clientes.scss';


export default function Clientes() {
    const [nome, setNome] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');

    
    async function handleSubmitAddCliente(e) {
        e.preventDefault();

        if(cnpj.length >= 10 && endereco.length >= 6) {
            await addDoc(collection(db, "clientes"), {
                nomeFantasia: nome,
                cnpj: cnpj,
                endereco: endereco
            })
            .then(()=> {
                setNome('');
                setCnpj('');
                setEndereco('');
                toast.success('Empresa registrada com sucesso!');
            })
            .catch((erro)=> {
                console.log('ERRO AO REGISTRAR CLIENTE!');
                console.log(erro);
            })
        } else {
            toast.warn('Campos de CNPJ ou Endereço inválido');
        }
    }


   
    return (
        <main className='Container'>

            <Sidebar/>

            <div className="page-content">
                <Title titulo="Novo cliente">
                    <FiUser size={25}/>
                </Title>

                <div className="Clientes-container">

                    <form onSubmit={handleSubmitAddCliente}>

                        <div className="input-div">
                            <label htmlFor="nome">Nome Fantasia</label>
                            <input
                                type="text"
                                id='nome'
                                placeholder='Nome da empresa'
                                value={nome}
                                onChange={(e)=> setNome(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-div">
                            <label htmlFor="cnpj">CNPJ</label>
                            <input
                                type="text"
                                id='cnpj'
                                placeholder='Digite o CNPJ'
                                value={cnpj}
                                onChange={(e)=> setCnpj(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-div">
                            <label htmlFor="endereco">Endereço</label>
                            <input
                                type="text"
                                id='endereco'
                                placeholder='Endereço da empresa'
                                value={endereco}
                                onChange={(e)=> setEndereco(e.target.value)}
                                required
                            />
                        </div>
                        
                        <button type='submit'>Salvar</button>

                    </form>
                    
                </div>

                {/* <div className="Perfil-container">
                    <button className='logout-btn' onClick={handleLogout}>Sair</button>
                </div> */}
            </div>
        
        </main>
    )
}