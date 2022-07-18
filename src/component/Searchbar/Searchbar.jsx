import React, { Component } from "react";
import SvgSearch from "../additional/SvgSearch/SvgSearch";
import {Backdrop, Form, SearchBtn, Search} from './Searchbar.styled';

class Searchbar extends Component {
    
    state = {
        search: '',
    }

    handleSearch = (e) => {
        const {value} = e.currentTarget;

        this.setState({search: value.trim()});
    }

    handleSubmit = (e) => {
        const {search} = this.state;

        if (search.trim() === '') {
            return;
        }
        
        e.preventDefault();

        this.props.onSearch(search);

        this.reset();
    }

    reset = () => {
        this.setState({search: ''});
    }

    render () {

        return(
            <Backdrop>
                <Form onSubmit={this.handleSubmit}>             
                    <SearchBtn>
                        <SvgSearch/>
                    </SearchBtn>
                    
                    <Search 
                        onChange={this.handleSearch} 
                        className="input"
                        type="text" 
                        autoComplete="off" 
                        autoFocus
                        placeholder="search images and photos">
                    </Search>
                </Form>
            </Backdrop>
        ) 
    }
}

export default Searchbar;