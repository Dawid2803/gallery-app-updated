import React, { Component } from 'react'
import axios from 'axios'


// Component imports
import Search from "./components/Search";
import Nav from "./components/Nav";
import PhotoContainer from "./components/PhotoContainer";
import apiKey from "./config"


export class App extends Component {

  state = {
    galleryData: []
  }



  componentDidMount(){
    this.performSearch()
  }

  performSearch = (tags = 'dogs') => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=09c4b273fe9136275a25231194314587&tags=${tags}&per_page=24&format=json&nojsoncallback=1`)
    .then(resData => {
      this.setState({galleryData: resData.data.photos.photo})
      console.log(this.state.galleryData)
    })
  }

  
  render(){


    return (
      <div>
        <Search />
        <Nav />
        <PhotoContainer galleryData={this.state.galleryData}/>
      </div>
      );
  }
}

export default App;
