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
import { apiKey } from './config'



//add Routes

export class App extends Component {

  state = {
    galleryData: []
  }

   




  performSearch = (tags) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tags}&per_page=24&format=json&nojsoncallback=1`)
    .then(resData => {
      this.setState({galleryData: resData.data.photos.photo})
      console.log(this.state.galleryData)
    })
  }

  handleSearch = (e) => {
    let topic = this.topic.value;
    let path = `/${topic}`;
    this.props.history.push(path);
  }


  render(){



    return (
      <BrowserRouter>
        <div >
          <Search />
          <Nav search={this.performSearch} />
          <Switch>
            <Route exact path='/' render={ () => <Redirect to="/cats" />} />
            <Route path='/cats' render={ () => <PhotoContainer galleryData={this.state.galleryData} search={this.performSearch} topic={"cats"} />}></Route> 
            <Route path='/dogs' render={ () => <PhotoContainer galleryData={this.state.galleryData} search={this.performSearch} topic={"dogs"}/>}></Route> 
            <Route path='/birds' render={ () => <PhotoContainer galleryData={this.state.galleryData} search={this.performSearch} topic={"birds"}/>}></Route> 
          </Switch>
        </div>
      </BrowserRouter>
      );
  }
}

export default App;
