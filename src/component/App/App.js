import React, { Component } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
// import Loader from "../Loader/Loader";

class App extends Component {
  state = {
    search: "",
  };

  handleFetch = (text) => {
    this.setState({ search: text });
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
