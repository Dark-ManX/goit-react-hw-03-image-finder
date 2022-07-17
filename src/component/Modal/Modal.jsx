import React, { Component } from "react";
import { createPortal } from "react-dom";
import { ModalBackdrop, ModalBody } from "./Modal.styled";

const modalRoot = document.querySelector('#modal')

class Modal extends Component {
    
    componentDidMount() {
        window.addEventListener('keydown', e => {
            if (e.code === 'Escape') {
                this.props.onClose();
            }
        })

        window.addEventListener('click', e => {
            if (e.target.nodeName !== 'IMG') {
                this.props.onClose();
            } 
        })
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
        