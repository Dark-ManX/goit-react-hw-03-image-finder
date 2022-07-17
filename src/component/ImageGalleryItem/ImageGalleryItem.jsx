import { StyledLi, Img } from "./ImageGalleryItem.styled";

const ImageGalleryItem = ({onClick, preview, alt}) => {
    return (
            <StyledLi>
                <Img src={preview} alt={alt} onClick={onClick}/>
            </StyledLi>
    )
}

export default ImageGalleryItem;