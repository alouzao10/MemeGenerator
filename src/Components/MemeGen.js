import React, { Component } from 'react';

class MemeGen extends Component {
  constructor() {
    super();
    this.state = {
      topTxt: '',
      btmTxt: '',
      randomImg: 'http://i.imgflip.com/1bif.jpg',
      allMemeImgs: [],
    };

    this.updateTxt = this.updateTxt.bind(this);
    this.generateMeme = this.generateMeme.bind(this);
  }

  componentDidMount() {
    fetch('https://api.imgflip.com/get_memes')
      .then((response) => response.json())
      .then((ret) => {
        //console.log(ret.data);
        const { memes } = ret.data;
        this.setState({ allMemeImgs: memes });
      });
  }

  updateTxt(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  generateMeme(e) {
    e.preventDefault();

    const num = Math.floor(Math.random() * this.state.allMemeImgs.length);
    const randImg = this.state.allMemeImgs[num].url;
    this.setState({ randomImg: randImg });
  }

  render() {
    return (
      <div>
        <form>
          <input
            placeholder='Top Text'
            type='text'
            name='topTxt'
            value={this.state.topTxt}
            onChange={this.updateTxt}
          />
          <br />
          <input
            placeholder='Bottom Text'
            type='text'
            name='btmTxt'
            value={this.state.btmTxt}
            onChange={this.updateTxt}
          />
          <br />
          <button type='submit' onClick={this.generateMeme}>
            Generate
          </button>
        </form>
        <hr />
        <div>
          <h2>{this.state.topTxt}</h2>
          <img src={this.state.randomImg} alt='' />
          <h2>{this.state.btmTxt}</h2>
        </div>
      </div>
    );
  }
}

export default MemeGen;
