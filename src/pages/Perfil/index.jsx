// Funcionalidades / Libs:
import { useContext, useState } from 'react';

import { db, storage } from '../../services/firebaseConnection';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Contexts:
import { AuthContext } from '../../contexts/authContext';

// Components:
import { Sidebar } from '../../components/Sidebar';
import { Title } from '../../components/Title';
import { toast } from 'react-toastify';

// Assets:
import { FiSettings, FiUpload } from 'react-icons/fi';
import avatarImg from '../../assets/avatar.png';

// Estilos:
import '../pages.scss';
import './perfil.scss';


export default function Perfil() {
    const { user, storageUser, setUser, logout } = useContext(AuthContext);

    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
    const [nome, setNome] = useState(user && user.nome);
    const [email, setEmail] = useState(user && user.email);


    function handleFile(e) {
        if(e.target.files[0]) {
            const isImage = e.target.files[0];

            if(isImage.type === 'image/jpeg' || isImage.type === 'image/png') {
                setAvatarFile(isImage);
                setAvatarUrl(URL.createObjectURL(isImage));
            } else {
                toast.warn('Arquivo não aceito');
                return;
            }
        }
    }

    async function uploadPhoto() {
        const uploadRef = ref(storage, `avatares/${user.uid}/${avatarFile.name}`);

        // função que faz o upload do arquivo/file p/ o firebase
        await uploadBytes(uploadRef, avatarFile)
        .then((snapshot)=> {

            // função que pega a URL do arquivo/file salvo no firebase
            getDownloadURL(snapshot.ref)
            .then(async (downloadURL)=> {
                let urlPhoto = downloadURL;

                // ira atualizar o DB com a nova Url do avatar + Nome
                const docRef = doc(db, "users", user.uid)
                await updateDoc(docRef, {
                    avatarUrl: urlPhoto,
                    nome: nome,
                })
                .then(()=> {
                    // pega os dados do usuario da state "user" e atualiza o avatarUrl e nome
                    let newDataUser = {
                        ...user,
                        avatarUrl: urlPhoto,
                        nome: nome,
                    }

                    setUser(newDataUser);
                    storageUser(newDataUser);
                    toast.success('Perfil atualizado com sucesso!');
                })
                .catch((erro)=> {
                    console.log('ERRO NO UPDATE DADOS DO PERFIL');
                    console.log(erro);
                })
            })
        })
    }

    async function handleSubmitPerfil(e) {
        e.preventDefault();

        // Quando só o Nome do usuario/perfil é atualizado
        if((avatarUrl === null || avatarUrl === user.avatarUrl) && nome !== user.nome) {
            const docRef = doc(db, "users", user.uid);
            await updateDoc(docRef, {
                nome: nome,
            })
            .then(()=> {
                // pega os dados do usuario da state "user" e atualiza apenas o nome
                let newDataUser = {
                    ...user,
                    nome: nome,
                }

                setUser(newDataUser);
                storageUser(newDataUser);
                toast.success('Perfil atualizado com sucesso!');
            })
            .catch((erro)=> {
                console.log('ERRO NO UPDATE DADOS DO PERFIL');
                console.log(erro);
            })
        } else if((avatarUrl !== user.avatarUrl) && nome !== '') {
            // Atualiza tanto Nome quanto a Foto de perfil
            uploadPhoto();
        }
    }

    async function handleLogout(){
        await logout();
    }


    return (
        <main className='Container'>

            <Sidebar/>

            <div className="page-content">
                <Title titulo="Meu perfil">
                    <FiSettings size={25}/>
                </Title>

                <div className="Perfil-container">

                    <form onSubmit={handleSubmitPerfil}>
                        <label className='label-avatar'>
                            <span>
                                <FiUpload/>
                            </span>

                            <input 
                                type="file" 
                                accept='image/*'
                                onChange={handleFile}
                            />
                            <br/>

                            <img 
                                src={avatarUrl === null ? avatarImg : avatarUrl} 
                                alt={`Foto de perfil de ${user.nome}`} 
                            />

                            {/* {avatarUrl === null ? (
                                <img src={avatarImg} alt={`Foto de perfil do ${user.nome}`} />
                            ) : (
                                <img src={avatarImg} alt={`Foto de perfil do ${user.nome}`} />
                            )} */}
                        </label>

                        <div className="bloco-inputs">
                            <div className="input-div">
                                <label htmlFor="nome">Nome</label>
                                <input
                                    type="text"
                                    id='nome'
                                    value={nome}
                                    onChange={(e)=> setNome(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-div">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    disabled={true}
                                />
                            </div>
                        </div>

                        <button type='submit'>Salvar</button>
                    </form>

                </div>

                <div className="Perfil-container">
                    <button className='logout-btn' onClick={handleLogout}>Sair</button>
                </div>
            </div>
        
        </main>
    )
}