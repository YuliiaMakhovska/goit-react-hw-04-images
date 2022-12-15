import PropTypes from 'prop-types';
import {Item, Image} from './ImageGalleryItem.styled'

const ImageGalleryItem = ({ id, smallImg, openModal, description }) => {
    return(
        <Item>
    <Image src={smallImg} alt={description} id={id} onClick={openModal} />
</Item>
    );
}

ImageGalleryItem.propTypes = {
    id: PropTypes.number.isRequired,
    smallImg: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired,
}

export default ImageGalleryItem;