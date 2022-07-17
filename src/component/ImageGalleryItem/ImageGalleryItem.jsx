import PropTypes, { string } from 'prop-types';
import { StyledLi, Img } from "./ImageGalleryItem.styled";

const ImageGalleryItem = ({onClick, preview, alt}) => {
    return (
            <StyledLi>
                <Img src={preview} alt={alt} onClick={onClick}/>
            </StyledLi>
    )
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    onClick: PropTypes.func,
    preview: PropTypes.string,
    alt: PropTypes.string,
}