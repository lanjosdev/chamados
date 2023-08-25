// Funcionalidades / Libs:
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { auth, db } from '../services/firebaseConnection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { toast } from "react-toastify";
// import PropTypes from 'prop-types';


// UserProvider.propTypes = {
//     children: PropTypes.object.isRequired,
// }

// Cria o Contexto e deixe exportado:
export const AuthContext = createContext({});

// Provedor do contexto acima (prove os values(var, states, metodos, etc) ao filhos desse provedor):
export default function AuthProvider({ children }) {
    // Abaixo Values do contexto (variables e functions):
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(()=> {
        async function checkUserLogado(){
            const tokenLocal = localStorage.getItem('tokenUser');
            // seria bom tbm fazer o check se o token ainda está valido

            if(tokenLocal){
                setUser(JSON.parse(tokenLocal));
            }

            setLoading(false);
        }
        checkUserLogado();
    }, [])

    // Logar usuario:
    async function authLogin(email, password) {
        setLoadingAuth(true);
        
        // função de autenticar o login
        await signInWithEmailAndPassword(auth, email, password)
        .then(async (valueUser)=> {
            let uid = valueUser.user.uid;

            // const docRef = doc(db, "users", uid);

            // função que busca dado (getDoc)
            const docSnap = await getDoc(doc(db, "users", uid));

            let dadosUser = {
                uid: docSnap.data().idUser,
                nome: docSnap.data().nome,
                email: valueUser.user.email,
                avatarUrl: docSnap.data().avatarUrl
            };
            setUser(dadosUser);
            storageUser(dadosUser);
            toast.success('Login realizado com sucesso!');

            navigate('/dashboard');
        })
        .catch((error)=> {
            console.log('ERRO AO LOGAR!');
            console.log(error);
            toast.error('LOGIN INVÁLIDO!');
        })

        setLoadingAuth(false);
    }

    // Cadastrar um novo usuario:
    async function authRegister(email, password, name) {
        setLoadingAuth(true);
        
        // função de criar conta
        await createUserWithEmailAndPassword(auth, email, password)
        .then(async (valuesUser)=> {
            let uid = valuesUser.user.uid;

            // função de criar dados na DB
            await setDoc(doc(db, "users", uid), {
                idUser: uid,
                nome: name,
                avatarUrl: null
            })
            .then(()=> {
                let dadosUser = {
                    uid: uid,
                    nome: name,
                    email: valuesUser.user.email,
                    avatarUrl: null
                };
                setUser(dadosUser);
                storageUser(dadosUser);
                toast.success('Cadastro realizado com sucesso!');

                navigate('/dashboard');
            })
        })
        .catch((error)=> {
            console.log('DEU ERRO!');
            console.log(error);
        })

        setLoadingAuth(false);
    }

    // Salvar dados do user no localstorage:
    function storageUser(data) {
        localStorage.setItem('tokenUser', JSON.stringify(data));
    }

    async function logout() {
        await signOut(auth);
        localStorage.removeItem('tokenUser');
        setUser(null);
    }



    // Retorna os values para os filhos:
    return (
        <AuthContext.Provider 
            value={{
                logado: !!user, //se for null = false OU true
                user,
                loadingAuth,
                loading,
                authLogin,
                authRegister,
                logout,
                storageUser,
                setUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}