import { Oval } from 'react-loader-spinner';
import {LoaderBox} from './Loader.styled'

const Loader = () => {
    return (
        <LoaderBox>
            <Oval height={80} width={80} color="#3f51b5" />
        </LoaderBox>
    )
}
export default Loader;