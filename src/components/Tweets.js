import React from "react";
import { Link } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import CreateTweet from './CreateTweet';
// import Tweet from './Tweet';

class Tweets extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      tweets: [],
      isLoading: false,
      error: null,
      payload: null,
    }
  }
  
  async componentDidMount() {
    const token = localStorage.getItem('twitter_clone_token');

    if(token){
      const payload = jwtDecode(token);

      this.setState({
        payload
      });
    }
    
    this.populateTweets();
  }

  async handleDeleteTweet(id){

    await fetch(`${process.env.REACT_APP_API_URL}/tweets/${id}`, {
      method: 'DELETE',
      headers: {
        'x-auth-token': localStorage.getItem('twitter_clone_token')
      }
    })

    this.populateTweets();
}

  populateTweets() {
    try {
      this.setState({ isLoading: true });
      fetch(`${process.env.REACT_APP_API_URL}/tweets`)
      .then(res => res.json())
      .then(data => {
        this.setState({ tweets: data, isLoading: false});
      })
    } catch (error) {
      this.setState({ error });
    }
  }

  

  render() {
    let {tweets, payload, error, isLoading } = this.state;

    if (error) {
      return (
        <div>
        <p>Oops! Something went wrong!</p>
        <pre>{error.message}</pre>
        </div>
      );
    }

    if (isLoading) {
    return (
      <div>
      <p>Loading books...</p>   
      </div>
    );
    }

    const tweetElements = tweets.map((tweet) => {
      let date = tweet.created_at.split('').splice(0,10).join('');

      return (
        // <Tweet 
        // tweet={tweet} 
        // payload={payload} 
        // populateTweets={() => this.populateTweets}/>
        <div className="tweet-card" key={tweet.id}>
          <div className="tweet-card-info">
            <img src={tweet.image} />
            <p>{tweet.name} 
            <Link to={`/tweets/${tweet.username}`}> @{tweet.username}</Link>
            </p>
            <p><small>| {date}</small></p>
          </div>
          <p className="tweet-message">{tweet.message}</p>
          {payload && payload.username === tweet.username && (
          <button
          className="delete-tweet-btn"
          onClick={() => this.handleDeleteTweet(tweet.id)}
          >Delete</button>)}
        </div>
      )
    });

    return(
      <div className="content-container">
        {!payload &&  <Link to={`/login`}><button className="logout-btn">Log in</button></Link>}
        {payload && (<>
        <Link to={`/logout`}><button className="logout-btn">Log out</button></Link>
        <h2>Latest tweets for you, {payload.username}</h2>
        </>)}
        {payload && (<CreateTweet populateTweets={this.populateTweets.bind(this)}/>)}
        {tweets.length ? (
          <ul className="tweets">{tweetElements}</ul>
          ) : (
          <p>No tweets..</p>
          )}
      </div>
    )
  }

}


export default Tweets;