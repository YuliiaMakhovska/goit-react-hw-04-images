import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Container } from "./App.styled";
import fetchImages from "../../services/Api";
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from "components/ImageGallery/ImageGallery";
import Modal from "components/Modal/Modal";
import Loader from "components/Loader/Loader";


export class App extends Component {
  state = {
    page: 1,
    query: '',
    items: [],
    url: null,
    isLoading: false, 
  }

  searchQuery = query => {
    this.setState({
      page: 1,
      query: query,
      items:[],
    })
  }
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState + 1,
    }))
  }
  componentDidUpdate(_, prevState) {
    const { page, query } = this.state;
    if (prevState.page !== page ||
      prevState.query !== query) {
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
  
  render() {
    const { url, items, isLoading } = this.state;
    return (<Container>
      <Searchbar onSubmit={this.searchQuery} />
      <ImageGallery items={items} onItemClick={this.openModal} loadMore={this.loadMore}/>
      {url && <Modal activeUrl={url} alt={url} onClose={this.closeModal} />}
      {isLoading && <Loader />}
      <ToastContainer />
      </Container>
    )
  }
 
};