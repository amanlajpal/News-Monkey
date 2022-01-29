import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar.js'
import News from './components/News.js'
import LoadingBar from 'react-top-loading-bar'
import {
  Routes,
  Route
} from "react-router-dom";



export default class App extends Component {
  apiKey=process.env.REACT_APP_NEWS_API;
  pageSize=20;
  constructor(){
    super()
    this.state={
      progress:0
    }
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Navbar />
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
        <Routes>
          <Route exact path="/"  element={<News progress={this.setProgress} key={"general"} pageSize={this.pageSize} country="in" category='general' apiKey={this.apiKey} />} />
          <Route exact path="/science"  element={<News progress={this.setProgress} key={"science"} pageSize={this.pageSize} country="in" category='science' apiKey={this.apiKey} />} />
          <Route exact path="/business"  element={<News progress={this.setProgress} key={"business"} pageSize={this.pageSize} country="in" category='business' apiKey={this.apiKey} />} />
          <Route exact path="/entertainment"  element={<News progress={this.setProgress} key={"entertainment"} pageSize={this.pageSize} country="in" category='entertainment' apiKey={this.apiKey} />} />
          <Route exact path="/health"  element={<News progress={this.setProgress} key={"health"} pageSize={this.pageSize} country="in" category='health' apiKey={this.apiKey} />} />
          <Route exact path="/sports"  element={<News progress={this.setProgress} key={"sports"} pageSize={this.pageSize} country="in" category='sports' apiKey={this.apiKey} />} />
          <Route exact path="/technology"  element={<News progress={this.setProgress} key={"technology"} pageSize={this.pageSize} country="in" category='technology' apiKey={this.apiKey} />} />
        </Routes>
      </div>
    )
  }
}