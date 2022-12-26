import { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { Container } from "./App.styled";
import fetchImages from "../../services/Api";
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from "components/ImageGallery/ImageGallery";
import Modal from "components/Modal/Modal";
import Loader from "components/Loader/Loader";
import Button from "components/Button/Button";

export const App = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]);
  const [url, setUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState('');

  useEffect(() => {
    if (searchQuery !== '') {
      setIsLoading(true);
        
      const fetchSearchQuery = async () => {
        setIsLoading(true);
        try {
          const { hits } = await fetchImages(searchQuery, page);
          if (hits.length === 0) {
            toast.error('Nothing was found for your query');
            return;
          }
          setItems(items => [...items, ...hits]);
          setTotal('');
        } catch {
          toast.error('An error has occurred, please try again');
        } finally {
          setIsLoading(false);
        }
      }
      fetchSearchQuery()
    }
    }, [searchQuery, page]);

const openModal = activeUrl => setUrl(activeUrl);
const closeModal = () => setUrl('');
const loadMore = () => {
    setPage(page => page + 1)
  }

const handleSubmit = event => {
    event.preventDefault();
    const query = event.target.elements.query.value;
    if (searchQuery !== query) {
      setPage(1);
      setSearchQuery(query);
      setItems([]);
} else if (query.trim() === '') {
      return toast.error('The search cannot be performed without a query');
    }
      else if (searchQuery === query) {
      return toast.success('The images are already on the screen!!');
    }
  }
      return (<Container>
      <Searchbar onSubmit={handleSubmit} />
      {items.length > 0 && searchQuery !== '' && <ImageGallery items={items} onItemClick={openModal} loadMore={loadMore} />}
      {url && <Modal activeUrl={url} alt={url} onClose={closeModal} />}
      {isLoading  && <Loader />}
      {items.length > 0 && !isLoading && searchQuery !== '' && items.length !== total && <Button onClick={loadMore}/>}
      <Toaster position="top-right" reverseOrder={false} />
      </Container>
    )
}
