import PropTypes from 'prop-types';
import { StyledGallery } from './ImageGallery.styled';
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

const ImageGallery = ({gallery, onClick}) => {

    return (
        <StyledGallery>
            
            {gallery.map(({id, webformatURL, tags}) => {
                
                return (

                    <ImageGalleryItem 
                    key={id} 
                    id={id}
                    handleClick={onClick} 
                    preview={webformatURL} 
                    alt={tags}
                    />
                )
            })}

        </StyledGallery>
    )  
} 

export default ImageGallery;

ImageGallery.propTypes = {
    gallery: PropTypes.array.isRequired,
    handleClick: PropTypes.func,
}