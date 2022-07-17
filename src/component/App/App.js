import React, { Component } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";

class App extends Component {
  state = {
    src: null,
    search: "",
    loader: false,
  };

  handleFetch = (text) => {
    this.setState({ search: text });
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSearch={this.handleFetch} />

        {this.state.loader && <Loader />}

        <ImageGallery data={this.state.search} />
      </div>
    );
  }
}

export default App;
