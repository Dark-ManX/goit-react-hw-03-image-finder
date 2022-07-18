import React, { Component } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";
import { Container, Button, Image } from "./App.styled";
// import { StyledGallery, Image, Container, Button } from "./ImageGallery.styled";

const BASE_URL = "https://pixabay.com/api/";

class App extends Component {
  state = {
    search: "",
    page: 1,
    gallery: [],
    images: [],
    error: null,
    status: "none",
    img: null,
    ind: null,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, search } = this.state;

    if (prevState.search !== search || prevState.page !== page) {
      this.setState({
        status: "pending",
      });

      fetch(
        `${BASE_URL}?q=${search}&page=${page}&key=27564441-2bad7552450aa73f501c58b21&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          }

          return Promise.rejected(new Error("not found"));
        })
        .then(({ hits }) => {
          this.setState((prevState) => ({
            gallery: prevState.gallery.concat(hits),
            status: "resolved",
          }));
        })
        .catch((error) => this.setState({ error, status: "rejected" }));
    }
  }

  handleFetch = (text) => {
    this.setState({ search: text, gallery: [] });
  };

  handleLoad = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
      gallery: this.state.gallery.concat(this.state.images),
    }));
  };

  handleClick = (el, ind) => {
    console.log("clicked");
    this.setState({
      ind: ind,
      img: el.largeImageURL,
      showModal: true,
    });
  };

  onClose = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { gallery, status, showModal, img } = this.state;
    console.log(gallery);

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

            <ImageGallery gallery={gallery} />

            <Button onClick={this.handleLoad} type="button">
              Load more
            </Button>

            {showModal && (
              <Modal onClose={this.onClose} children={<Image src={img} />} />
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

            <ImageGallery gallery={gallery} />
          </Container>
        );
    }
  }
}

export default App;
