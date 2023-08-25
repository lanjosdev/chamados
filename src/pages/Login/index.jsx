// Funcionalidades / Libs:
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

// Contexts:
import { AuthContext } from '../../contexts/authContext';

// Assets:
import logo from '../../assets/logo.png';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';

// Estilo:
import './login.scss';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showSenha, setShowSenha] = useState(false);

    // Values context:
    const { 
        authLogin,
        loadingAuth
    } = useContext(AuthContext);


    async function handleSubmitLogin(e) {
        e.preventDefault();

        if(email !== '' && password !== '') {
            await authLogin(email, password)
        }
    }


    return (
        <main className='Login-container'>
            <div className="grid">
    
            <h1>
                <img src={logo} alt="Logotipo" />
            </h1>
            <div className="form-container">
                <p>Faça seu login no ambiente</p>

                <form onSubmit={handleSubmitLogin} autoComplete="off">
                    <div className="input-div">
                        <AiOutlineUser/>
                        <input
                            type="email"
                            placeholder='Email'
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-div">
                        <AiOutlineLock/>
                        <input
                            type={showSenha ? 'text' : 'password'}
                            placeholder='Senha'
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="show-senha">
                        <input
                            type="checkbox"
                            id='showSenha'
                            onClick={()=> setShowSenha(!showSenha)}
                        />
                        <label htmlFor="showSenha">Mostrar senha</label>
                    </div>
                    <button type='submit'>{loadingAuth ? 'Verificando...' : 'Entrar'}</button>
                </form>
            </div>

            <Link to='/signup'>Ainda não tem conta? Cadastra-se!</Link>
    
            </div>  
        </main>

    )
}