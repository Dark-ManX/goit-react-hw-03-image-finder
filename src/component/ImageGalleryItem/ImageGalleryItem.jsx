import PropTypes from 'prop-types';
import { StyledLi, Img } from "./ImageGalleryItem.styled";

const ImageGalleryItem = ({preview, alt, handleClick, id}) => {
    return (
            <StyledLi>
                <Img src={preview} alt={alt} onClick={() => handleClick(id)}/>
            </StyledLi>
    )
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    onClick: PropTypes.func,
    preview: PropTypes.string,
    alt: PropTypes.string,
}