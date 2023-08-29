// Funcionalidades / Libs:
import PropTypes from "prop-types";
// import { useContext, useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom';
// import { db } from '../../services/firebaseConnection';
// import { collection, getDocs, orderBy, limit, startAfter, query } from 'firebase/firestore';

// Contexts:
// import { AuthContext } from '../../contexts/authContext'

// Components:
// import { Sidebar } from '../../components/Sidebar';
// import { Title } from '../../components/Title';
// import { Modal } from '../../components/Modal';
import { FiX } from 'react-icons/fi';
// import { format } from 'date-fns';

// Estilos:
import './modal.scss';


Modal.propTypes = {
    detalhes: PropTypes.any.isRequired,
    closeModal: PropTypes.func.isRequired,
}

export function Modal({ detalhes, closeModal }) {

    return (
        <div className='Modal-container'>

            <div className='modal' onClick={closeModal}>
                <button className='btn-close'>
                    <FiX />
                    <span>Voltar</span>
                </button>

                <div className="modal-content">
                    <h2>Detalhes do chamado</h2>

                    <div className="row">
                        <p>Cliente: <span>{detalhes.cliente}</span></p>
                    </div>

                    <div className="row duplo">
                        <p>Asunto: <span>{detalhes.assunto}</span></p>
                        <p>Cadastrado em: <span>{detalhes.criadoFormat}</span></p>
                    </div>

                    <div className="row">
                        <p>Status: <span 
                                    className="status" 
                                    style={{backgroundColor: detalhes.status === 'Aberto' ? '#5cb85c' : detalhes.status === 'Atendido' ? '#999' : '#1a449e' }}
                                >{detalhes.status}</span></p>
                    </div>

                    {detalhes.complemento !== '' && (
                        <div className="row">
                            <h3>Complemento:</h3>
                            <p>{detalhes.complemento}</p>
                        </div>
                    )}
                                          
                </div>
            </div>

        </div>
    )
}