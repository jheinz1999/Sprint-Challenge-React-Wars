import React, { Component } from 'react';
import './App.scss';

import StarwarsChars from './components/StarwarsChars';

class App extends Component {
  constructor() {
    super();
    this.state = {
      starwarsChars: [],
      nextURL: null,
      prevURL: null,
      loading: true,
      pages: null
    };
  }

  componentDidMount() {
    this.getCharacters('https://swapi.co/api/people');
  }

  getCharacters = URL => {
    // feel free to research what this code is doing.
    // At a high level we are calling an API to fetch some starwars data from the open web.
    // We then take that data and resolve it our state.

    this.setState({loading: true}, () => {

      fetch(URL)
        .then(res => {
          return res.json();
        })
        .then(data => {
          this.setState({
            starwarsChars: data.results,
            nextURL: data.next,
            prevURL: data.previous,
            loading: false,
            pages: Array.from(new Array(data.count % 10 == 0 ? Math.floor(data.count / 10) : Math.floor(data.count / 10) + 1),(val,index)=>index+1)
          });
        })
        .catch(err => {
          throw new Error(err);
        });

    });

  };

  render() {
    return (
      <div className="App">
        <h1 className="Header">React Wars</h1>
        <div className='page-links'>
          {this.state.pages ? this.state.pages.map(page => <p onClick={() => this.getCharacters(`https://swapi.co/api/people/?page=${page}`)}>{page}</p>) : null}
        </div>
        <div className={this.state.nextURL ? 'next-button' : 'invisible'} onClick={() => this.getCharacters(this.state.nextURL)}>NEXT</div>
        <div className={this.state.prevURL ? 'previous-button' : 'invisible'} onClick={() => this.getCharacters(this.state.prevURL)}>PREV</div>
        {!this.state.loading ? <StarwarsChars data={this.state.starwarsChars} /> : <h2 className='load'>Loading data...</h2>}
      </div>
    );
  }
}

export default App;
