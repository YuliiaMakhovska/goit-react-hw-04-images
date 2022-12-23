
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem'
import {List} from './ImageGallery.styled'

const ImageGallery = ({ items, onItemClick }) => {
return (
    <>
        <List>
        {items.map(({id, webformatURL, largeImageURL, tags}) => (
        <ImageGalleryItem
        key={id}
        id={id}
        description={tags}
        smallImg={webformatURL}
        openModal={() => onItemClick(largeImageURL)}/>
        ))}
        </List>
        
    </>
)
}
ImageGallery.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired
        })
    ),
    onItemClick: PropTypes.func.isRequired,
}

export default ImageGallery;