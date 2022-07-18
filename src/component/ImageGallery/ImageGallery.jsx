import PropTypes from 'prop-types';
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

const ImageGallery = ({gallery, handleClick}) => {

    return (gallery.map(({id, webformatURL, tags}) => {
        return (
            <ImageGalleryItem 
                key={id} 
                onClick={handleClick} 
                preview={webformatURL} 
                alt={tags}
            />
        )
    }))
    
} 

export default ImageGallery;

ImageGallery.propTypes = {
    gallery: PropTypes.array.isRequired,
    handleClick: PropTypes.func,
}