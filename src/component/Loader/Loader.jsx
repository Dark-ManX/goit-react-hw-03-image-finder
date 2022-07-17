import { Circles } from "react-loader-spinner";
import {StyledLoader} from './Loader.styled';

const Loader = () => {
    return (
        <StyledLoader>
            <Circles color="#00BFFF" height={80} width={80}/>
        </StyledLoader>
    )
}

export default Loader;