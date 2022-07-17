import React, { Component } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
// import Loader from "../Loader/Loader";

class App extends Component {
  state = {
    search: "",
    images: [],
  };

  handleFetch = (text) => {
    this.setState({ search: text, images: [] });
  };

  render() {
    const { search } = this.state;

    return (
      <div className="App">
        <Searchbar onSearch={this.handleFetch} />
        <ImageGallery data={search} />
      </div>
    );
  }
}

export default App;
