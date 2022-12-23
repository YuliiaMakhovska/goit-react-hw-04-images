import React from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import { Wrapper, Form, Input, Button } from './Searchbar.styled';
import { BsSearch } from 'react-icons/bs';

const Searchbar = ({ onSubmit }) => {
    return (
    <Wrapper>
  <Form onSubmit={onSubmit}>
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