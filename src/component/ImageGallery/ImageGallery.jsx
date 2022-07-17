import React, { Component } from "react";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Loader from "../Loader/Loader";
import Button from "../Button/Button";
import { StyledGallery, Image, Container } from "./ImageGallery.styled";
import Modal from "../Modal/Modal";

const BASE_URL = 'https://pixabay.com/api/';

class ImageGallery extends Component {

    state = {
        page: 1,
        gallery: [],
        error: null,
        status: 'none',
        img: null,
        ind: null,
        showModal: false,
    };

    componentDidUpdate(prevProps, prevState) {

        if (prevProps.data !== this.props.data || prevState.page !== this.state.page) {
            this.setState({status: 'pending'})
            
            fetch(`${BASE_URL}?q=${this.props.data}&page=${this.state.page}&key=27564441-2bad7552450aa73f501c58b21&image_type=photo&orientation=horizontal&per_page=12`)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.rejected(
                    new Error('not found')
                )
            })
            .then(data => (this.setState(prevState => {
                    return ({gallery: prevState.gallery.concat(data.hits), status: 'resolved', })
                }
            )))
            .catch(error => this.setState({error, status: 'rejected'})) 
        }
    }

    handleLoad = () => {
        this.setState(prev => ({page: prev.page + 1,}))
    }

    handleClick = ({largeImageURL}, ind) => {
        console.log('clicked');
        this.setState({
            ind: ind,
            img: largeImageURL,
            showModal: true,
        })
    }

    onClose = () => {
        this.setState({showModal: false,})
    }

    render () {
        const {gallery, status} = this.state;
                console.log(gallery);


        switch (status) {

            case 'pending':
                return <Loader />;
            
            case 'resolved':
                return (
                    <div>
                        <StyledGallery>
                            {gallery.map((el, ind) => {

                                const {id, webformatURL, tags} = el
                                
                                return (                                    
                                    <ImageGalleryItem key={id} onClick={() => {this.handleClick(el, ind)}} preview={webformatURL} alt={tags}/>
                                )})}

                        </StyledGallery>
                        <Button onClick={this.handleLoad}>Load more</Button>
                        {this.state.showModal && <Modal onClose={this.onClose} children={<Image src={this.state.img}/>}/>}
                    </div>
                );

            case 'rejected':
                return (
                    <p>Information not found</p>
                );

            default:
                return;
        }
    }
} 

export default ImageGallery;