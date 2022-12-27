import { useEffect } from "react";
import PropTypes from 'prop-types';
import { createPortal } from "react-dom";
import {Overlay, ModalWindow, ModalImg} from './Modal.styled'


const modalRoot = document.querySelector('#modal-root');

const Modal = ({activeUrl, url, onClose}) => {
    useEffect(() => {
    const handleKeyDown = e => {
        if (e.code === 'Escape') {
            onClose();
        }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)

    }, [onClose])
    
    const handleOverlay = e => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }
            return createPortal(
            <Overlay onClick={handleOverlay}>
                <ModalWindow>
                    <ModalImg src={activeUrl} alt={url} />
                </ModalWindow>
            </Overlay>,
            modalRoot
        );
}
export default Modal;

Modal.propTypes = {
    activeUrl: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
}
