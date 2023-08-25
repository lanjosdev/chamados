// Funcionalidades / Libs:
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

// Contexts:
import { AuthContext } from '../../contexts/authContext';

// Assets:
import logo from '../../assets/logo.png';
import { AiOutlineUser, AiOutlineLock, AiOutlineMail } from 'react-icons/ai';

// Estilo:
// reaproveita o scss do login


export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const [showSenha, setShowSenha] = useState(false);

    // Values context:
    const { 
        authRegister, 
        loadingAuth 
    } = useContext(AuthContext);

    
    async function handleSubmitRegister(e) {
        e.preventDefault();

        if(name !== '' && email !== '' && password !== '') {
            if(password === confirmPass) {
                // chama a função do context
                await authRegister(email, password, name)
            } else {
                console.log('CONFIRMAÇÃO DE SENHA INVALIDA!');
            }
        }
    }


    return (
        <main className='Login-container'>
            <div className="grid">
    
            <h1>
                <img src={logo} alt="Logotipo" />
            </h1>
            <div className="form-container">
                <p>Cadastre uma nova conta</p>
                <form onSubmit={handleSubmitRegister} autoComplete="off">
                    <div className="input-div">
                        <AiOutlineUser/>
                        <input
                            type="text"
                            placeholder='Seu nome'
                            value={name}
                            onChange={(e)=> setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-div">
                        <AiOutlineMail/>
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
                    <div className="input-div">
                        <AiOutlineLock/>
                        <input
                            type={showSenha ? 'text' : 'password'}
                            placeholder='Confirme sua senha'
                            value={confirmPass}
                            onChange={(e)=> setConfirmPass(e.target.value)}
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
                    <button type='submit'>
                        {loadingAuth ? 'Cadastrando...' : 'Cadastrar'}
                    </button>
                </form>
            </div>

            <Link to='/'>Já possui uma conta? Faça o login!</Link>
    
            </div>  
        </main>

    )
}