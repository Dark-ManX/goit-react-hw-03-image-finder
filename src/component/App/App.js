import React, { Component } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";
import fetchRes from "../additional/fetchFunc/fetchFunc";
import { Container, Button, DisabledBtn, Image } from "./App.styled";
// import { StyledGallery, Image, Container, Button } from "./ImageGallery.styled";

// const BASE_URL = "https://pixabay.com/api/";

class App extends Component {
  state = {
    search: "",
    page: 1,
    gallery: [],
    error: null,
    status: "none",
    img: null,
    alt: "",
    showModal: false,
    disabled: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, search } = this.state;

    if (prevState.search !== search || prevState.page !== page) {
      this.setState({
        status: "pending",
      });

      fetchRes(search, page)
        .then(({ hits }) => {
          console.log(hits.length);
          // if (hits.length === this.state.gallery.length) {
          //   this.setState({ disabled: true });
          // }
          this.setState((prevState) => ({
            gallery: prevState.gallery.concat(hits),
            status: "resolved",
          }));
        })
        .catch((error) => this.setState({ error, status: "rejected" }));
    }
  }

  handleFetch = (text) => {
    this.setState({ search: text, gallery: [], page: 1 });
  };

  handleLoad = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
      gallery: [
        ...prevState.gallery
          .concat(this.state.gallery)
          .filter((el, ind) => this.state.gallery.indexOf(el) === ind),
      ],
    }));
  };

  handleClick = (ind) => {
    const { gallery } = this.state;
    const [largeImg] = gallery.filter((el) => el.id === ind);

    this.setState({
      img: largeImg,
      showModal: true,
    });
  };

  onClose = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { gallery, status, showModal, img, alt, disabled } = this.state;
    console.log(img);

    switch (status) {
      case "pending":
        return (
          <Container>
            <Searchbar onSearch={this.handleFetch} />

            <Loader />
          </Container>
        );

      case "resolved":
        return (
          <Container>
            <Searchbar onSearch={this.handleFetch} />

            <ImageGallery gallery={gallery} onClick={this.handleClick} />

            {!disabled ? (
              <Button onClick={this.handleLoad} type="button">
                Load more
              </Button>
            ) : (
              <DisabledBtn type="button" disabled>
                Load more
              </DisabledBtn>
            )}

            {showModal && (
              <Modal
                onClose={this.onClose}
                children={<Image src={img.largeImageURL} alt={alt} />}
              />
            )}
          </Container>
        );

      case "rejected":
        return (
          <Container>
            <Searchbar onSearch={this.handleFetch} />

            <p>Information not found</p>
          </Container>
        );

      default:
        return (
          <Container>
            <Searchbar onSearch={this.handleFetch} />
          </Container>
        );
    }
  }
}

export default App;
