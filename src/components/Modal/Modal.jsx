import React, { Component } from "react";
import PropTypes from 'prop-types';
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
        const { activeUrl, url } = this.props;
        return createPortal(
            <Overlay onClick={this.handleOverlay}>
                <ModalWindow>
                    <ModalImg src={activeUrl} alt={url} />
                </ModalWindow>
            </Overlay>,
            modalRoot
        );
    }
}
Modal.propTypes = {
    activeUrl: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
}
