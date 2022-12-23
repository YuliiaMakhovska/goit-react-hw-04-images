import React, { Component } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { Container } from "./App.styled";
import fetchImages from "../../services/Api";
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from "components/ImageGallery/ImageGallery";
import Modal from "components/Modal/Modal";
import Loader from "components/Loader/Loader";
import Button from "components/Button/Button";


export class App extends Component {
  state = {
    page: 1,
    query: '',
    items: [],
    url: null,
    isLoading: false, 
    total: '',
  }

  loadMore = () => {
    this.setState(({page}) => ({
      page: page + 1,
    }))
  }
  componentDidUpdate(_, prevState) {
    const { page, query } = this.state;
    if (prevState.page !== page ||
      prevState.query !== query ) {
      this.fetchSearchQuery();
      return;
    }
  }
  fetchSearchQuery = async () => {
    const { page, query } = this.state;
    this.setState({ isLoading: true });
    try { 
      const { hits } = await fetchImages(query, page);
      if (hits.length === 0) {
        toast.error('Nothing was found for your query');
        return;
      }
      this.setState(({ items }) => ({ items: [...items, ...hits] }));
    } catch {
      toast.error('An error has occurred, please try again');
    } finally {
      this.setState({ isLoading: false });
    }
  } 
  openModal = activeUrl => this.setState({ url: activeUrl });
  closeModal = () => this.setState({ url: '' });
  
  handleSubmit = event => {
    event.preventDefault();
    const query = event.target.elements.query.value;
    if (query !== this.state.query) {
      this.setState({
        page: 1,
        query: query,
        items: [],
      })
    } else if (query.trim() === '') {
      return toast.error('The search cannot be performed without a query');
    }
      else if (query === this.state.query) {
      return toast.success('The images are already on the screen!!');
    }
    }
  
  render() {
    const { url, items, isLoading, query, total } = this.state;
    return (<Container>
      <Searchbar onSubmit={this.handleSubmit} />
      {items.length > 0 && query !== '' && <ImageGallery items={items} onItemClick={this.openModal} loadMore={this.loadMore} />}
      {url && <Modal activeUrl={url} alt={url} onClose={this.closeModal} />}
      {isLoading  && <Loader />}
      {items.length > 0 && !isLoading && query !== '' && items.length !== total && <Button onClick={this.loadMore}/>}
      <Toaster position="top-right" reverseOrder={false} />
      </Container>
    )
  }
 
};