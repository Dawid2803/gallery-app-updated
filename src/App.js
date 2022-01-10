import React, { Component } from 'react'
import axios from 'axios'
import { 
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';


// Component imports
import Search from "./components/Search";
import Nav from "./components/Nav";
import PhotoContainer from "./components/PhotoContainer";
import NotFound from './components/NotFound';
import { apiKey } from './config'



//add Routes

export class App extends Component {

  state = {
    galleryData: [],
    catsData: [], //state for predetermined searches
    dogsData: [],
    birdsData: [],
    searchResults: '',
    isEmpty: false
  }

   //Performs searches for the links provided
  componentDidMount(){
    const navData = [
      {stateType:"catsData", tag: "cats"},
      {stateType:"dogsData", tag: "dogs"},
      {stateType:"birdsData", tag: "birds"}];
      
    navData.map( navItem => this.performSearch(navItem.stateType, navItem.tag))
    
  }


//fetches data from flickr API and generates data required to generate URL for photos
  performSearch = ( stateType, tags) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tags}&per_page=24&format=json&nojsoncallback=1`)
    .then(resData => {
      this.setState({[stateType]: resData.data.photos.photo, searchResults: tags})
    })
    .catch(err => {
      console.log("Error fetching and parsing data: ", err)
    })
  };


 


  render(){



    return (
      <BrowserRouter>
        <div >
          <Search onSearch={this.performSearch} searchResults={this.state.searchResults} />
          <Nav />
          <Switch>
            <Route exact path='/' render={ () => <Redirect to="/cats" />} />
            <Route path='/cats' render={ () => <PhotoContainer galleryData={this.state.catsData} results="Cats" />} /> 
            <Route path='/dogs' render={ () => <PhotoContainer galleryData={this.state.dogsData} results="Dogs" />} /> 
            <Route path='/birds' render={ () => <PhotoContainer galleryData={this.state.birdsData} results="Birds" />} /> 
            <Route path='/search/:searchResult' render={ () => <PhotoContainer galleryData={this.state.galleryData} results={this.state.searchResults} isEmpty={this.state.isEmpty} />} /> 
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
      );
  }
}

export default App;
