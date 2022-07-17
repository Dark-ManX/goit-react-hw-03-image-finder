import React, { Component } from "react";
import { createPortal } from "react-dom";
import { ModalBackdrop, ModalBody } from "./Modal.styled";

const modalRoot = document.querySelector('#modal')

class Modal extends Component {
    
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)

        window.addEventListener('click', this.handleClick)
        }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);

        window.removeEventListener('click', this.handleClick);
    }

    handleKeyDown = (e) => {
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    }

    handleClick = e => {
        if (e.target.nodeName !== 'IMG') {
            this.props.onClose();
        } 
    } 

    render() {
        return createPortal(
            <ModalBackdrop>
                <ModalBody>
                    {this.props.children}
                </ModalBody>
            </ModalBackdrop>, modalRoot,
        );
    }
}

export default Modal;
        