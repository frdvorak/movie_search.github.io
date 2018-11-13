import React, { Component } from 'react';
import './App.css';
import MovieRow from './MovieRow.js';
import $ from 'jquery';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.performSearch("avengers");
  }

  performSearch(searchTerm){
    console.log('Perform search using movie DB');
    const urlString = 'https://api.themoviedb.org/3/search/movie?api_key=1b5adf76a72a13bad99b8fc0c68cb085&query=' + searchTerm;
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        console.log("Fetched data successfully");
        //console.log(searchResults);
        const results = searchResults.results;

        var movieRows = [];

        results.forEach((movie)=> {
          movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path;
          console.log(movie.poster_path);
          const movieRow = <MovieRow key={movie.id} movie={movie}/>;
          movieRows.push(movieRow);
        })
        this.setState({rows: movieRows})
      },
      error: (xhr, status, err) => {
        console.log("Failer to fetch date");
      }
    })
  }

  searchChangeHandler(event){
    console.log(event.target.value);
    const boundObject = this;
    const searchTerm = event.target.value;
    boundObject.performSearch(searchTerm);
  }

  render() {
    return (
      <div className="App">
        <div className='titleBar'>
          
                <img width="70" src="camera.svg" alt='logo'/>
              
              
                <h1>MoviesDB Search</h1>
                <p>Search for your favourite movies</p>
        </div>
        <input onChange={this.searchChangeHandler.bind(this)} className="main-input" placeholder="Enter search term..."/>
      
        <div className='app-body container-fluid '>
          <div className="row">
          {this.state.rows}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
