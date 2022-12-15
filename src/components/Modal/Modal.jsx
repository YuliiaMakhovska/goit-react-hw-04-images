import React, { Component } from "react";
import { createPortal } from "react-dom";
import {Overlay, ModalWindow, ModalImg} from './Modal.styled'


const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    }
    handleKeyDown = e => {
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    }
    handleOverlay = e => {
        if (e.target === e.currentTarget) {
            this.props.onClose();
        }
    }

    render() {
        const { onClose, activeUrl, url } = this.props;
        return createPortal(
            <Overlay onClick={this.handleOverlay}>
                <ModalWindow onClick={onClose}>
                    <ModalImg src={activeUrl} alt={url} />
                </ModalWindow>
            </Overlay>,
            modalRoot
        );
    }
}
