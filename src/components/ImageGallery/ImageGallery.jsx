import Button from 'components/Button/Button';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem'
import {List} from './ImageGallery.styled'

const ImageGallery = ({ items, onItemClick, loadMore }) => {
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
        {items.length > 0 && <Button onClick={loadMore}/>}
    </>
)
}
ImageGallery.propTypes = {
    items: PropTypes.array,
    onItemClick: PropTypes.func.isRequired,
    loadMore: PropTypes.func.isRequired,
}

export default ImageGallery;