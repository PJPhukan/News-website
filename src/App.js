import React, { Component } from 'react'
import Navber from './Components/Navber'
import News from './Components/News'

export default class App extends Component {
  render() {
    return (
      <div>
        <Navber/>
        <News pageSize={15}/>
       
      </div>
    )
  }
}
