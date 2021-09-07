import React, { Component, useState } from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { Timeline } from 'react-twitter-widgets'

import spotifollow from './spotifollow.png';


const spotifyWebAPI = new Spotify();

let is_playing = false;
let artist = '';
let artest = 'Doja Cat';


let twitterHandles = [
  ['Doja Cat', 'dojacat'],
  ['Harry Styles', 'harry_styles'],
  ['Carly Rae Jepsen', 'carlyraejepsen'],
  ['Madison Beer', 'madisonbeer'],
];

class App extends Component {
  
  constructor(){
    super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      nowPlaying: {
        name: 'Not Checked',
        image: '',
        albumName: 'Not Checked',
        isPlaying: false,
        artist: 'Not Checked',
        url: 'Not Checked',
      },
    }
    if (params.access_token){
      spotifyWebAPI.setAccessToken(params.access_token);
    }
    spotifyWebAPI.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: {
            name: response.item.name,
            image: response.item.album.images[0].url,
            albumName: response.item.album.name,
            artist: response.item.artists[0].name,
            isPlaying: response.is_playing,
          }
        });
      })
  }
  
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getArtistUrl() {
    for (let i = 0; i < twitterHandles.length; i++) {
      console.log(this.state.nowPlaying.artist);
        if (this.state.nowPlaying.artist == twitterHandles[i][0]) {
          console.log("FUCK");
          console.log("FOUND HANDLE:" + twitterHandles[i][1]);
         // return twitterHandles[i][1];
          this.setState = "https://twitter.com/" + twitterHandles[i][1] + "?ref_src=twsrc%5Etfw";
          console.log(this.twitterUrl);
          return twitterHandles[i][1];
        }
    }
  }
  render() {
    return (
    
      <div className="App">
        <img src={spotifollow} className="logo-img" />
        <div className="login-button" ><a href='http://localhost:8888'><button><b>LOGIN WITH SPOTIFY</b></button></a></div>
        <div className="player">
          <img className="nowPlayingImage" src={this.state.nowPlaying.image}/>
          <div className="now-playing-name"><b>{this.state.nowPlaying.name}</b></div>
          <div className="now-playing-artist-album">{this.state.nowPlaying.artist}</div>{/* — <i>{this.state.nowPlaying.albumName}</i></div>*/}
        </div>
        {console.log(this.getArtistUrl())}
        <div className="twitter">
        <Timeline
          dataSource={{
            sourceType: 'profile',
            screenName: this.getArtistUrl(),
          }}
          options={{
            height: '500',
            width: '700',
            theme: "dark",
            chrome: "nofooter",
            borderColor: "none"
          }}  
        /></div>
        <p className="footer-msg">This is an independent project developed by Ben Hankin and as such is not complete. If you have any thoughts or suggestions, or if you're enjoying Spotifollow, please email me at <b>spotifollowteam@gmail.com</b>!</p>

        </div>
    );
  }
}


export default App;