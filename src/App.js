import React, { Component } from 'react'
import Navber from './Components/Navber'
import News from './Components/News'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
// import React, { useState } from 'react'
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  apikey = process.env.REACT_APP_NEWS_API;
  state={
    progress:0
  }
  setPrograss=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
          <Navber />
          <LoadingBar
          height={4}
            color='#f11946'
            progress={this.state.progress}
            // onLoaderFinished={() => setProgress(0)}
          />
          <Routes>
            <Route exact path='/' element={<News setPrograss={this.setPrograss} apiKey={this.apikey}   key="general" pageSize={15} country="in" category="general" />}></Route>
            <Route exact path='/business' element={<News setPrograss={this.setPrograss} apiKey={this.apikey}   key="business" pageSize={15} country="in" category="business" />}></Route>
            <Route exact path='/entertainment' element={<News setPrograss={this.setPrograss} apiKey={this.apikey}   key="entertainment" pageSize={15} country="in" ategory="entertainment" />}></Route>
            <Route exact path='/general' element={<News setPrograss={this.setPrograss} apiKey={this.apikey}   key="general" pageSize={15} country="in" category="general" />}></Route>
            <Route exact path='/health' element={<News setPrograss={this.setPrograss} apiKey={this.apikey}   key="health" pageSize={15} country="in" category="health" />}></Route>
            <Route exact path='/science' element={<News setPrograss={this.setPrograss} apiKey={this.apikey}   key="science" pageSize={15} country="in" category="science" />}></Route>
            <Route exact path='/sports' element={<News setPrograss={this.setPrograss} apiKey={this.apikey}   key="sports" pageSize={15} country="in" category="sports" />}></Route>
            <Route exact path='/technology' element={<News setPrograss={this.setPrograss} apiKey={this.apikey}   key="technology" pageSize={15} country="in" category="technology" />}></Route>
          </Routes>
        </Router>
      </div>
    )
  }
}

// a77010d6d7204f25b584d678362aca6b