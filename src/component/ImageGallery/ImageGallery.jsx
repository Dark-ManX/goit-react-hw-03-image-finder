import React, { Component } from "react";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Loader from "../Loader/Loader";
import { StyledGallery, Image, Container, Button } from "./ImageGallery.styled";
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

        const {data} = this.props;
        const {page} = this.state;

        if (prevProps.data !== data  || prevState.page !== page) {
            this.setState({
                status: 'pending',
            })
            
            fetch(`${BASE_URL}?q=${data}&page=${page}&key=27564441-2bad7552450aa73f501c58b21&image_type=photo&orientation=horizontal&per_page=12`)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.rejected(
                    new Error('not found')
                )
            })
            .then(response => (this.setState(prevState => {
                const arr = prevState.gallery.concat(response.hits);
                
                return ({gallery: arr.filter((el, ind) => {
                    return (arr.indexOf(el) === ind)}), 
                    status: 'resolved', })
                                         
            })
            ))
            .catch(error => this.setState({error, status: 'rejected'})) 
        }
    }

    handleLoad = () => {
       this.setState(prevState => ({page: prevState.page + 1}))
    }

    handleClick = (el, ind) => {
        console.log('clicked');
        this.setState({
            ind: ind,
            img: el.largeImageURL,
            showModal: true,
        })
    }

    onClose = () => {
        this.setState({showModal: false,})
    }

    render () {
        const {gallery, status, showModal, img} = this.state;
                console.log(gallery);


        switch (status) {

            case 'pending':
                return <Loader />;
            
            case 'resolved':
                return (
                    <Container>
                        <StyledGallery>
                            {gallery.map((el, ind) => {

                                const {id, webformatURL, tags} = el
                                
                                return (                                    
                                    <ImageGalleryItem key={id} onClick={() => {this.handleClick(el, ind)}} preview={webformatURL} alt={tags}/>
                                )})}

                        </StyledGallery>

                        <Button onClick={this.handleLoad} type="button">Load more</Button>
                        {showModal && <Modal onClose={this.onClose} children={<Image src={img}/>}/>}
                    </Container>
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