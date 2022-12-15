import React from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import { Wrapper, Form, Input, Button } from './Searchbar.styled';
import { BsSearch } from 'react-icons/bs';

const Searchbar = ({ onSubmit }) => {
    const handleSubmit = event => {
    event.preventDefault();
    const query = event.target.elements.query.value;
    if (query.trim() === '') {
        toast.error('The search cannot be performed without a query', {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
    return;
    }
    onSubmit(query);
    event.target.reset();
  }
    return (
    <Wrapper>
  <Form onSubmit={handleSubmit}>
    <Input
        type="text"
        name="query"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
    />
    <Button type="submit">
      <BsSearch size={30} />
    </Button>
    <ToastContainer/>
  </Form>
    </Wrapper>

 )
}
Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}
export default Searchbar;