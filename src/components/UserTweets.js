import React from "react";
import { Link } from "react-router-dom";
import jwtDecode from 'jwt-decode';
// import Tweet from "./Tweet";


class UserTweets extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
          tweets: [],
          user: {},
          isLoading: false,
          error: null,
          payload: null
        }
      }
    
      async componentDidMount() {
        const {username} = this.props.match.params;
        
        const token = localStorage.getItem('twitter_clone_token');

        if(token){
          const payload = jwtDecode(token);
    
          this.setState({
            payload
          });
        }

        try {
            this.setState({ isLoading: true });

            const tweets = await fetch(`${process.env.REACT_APP_API_URL}/tweets/${username}`)
            .then(res => res.json())
            .then(data => data);

            const user = await fetch(`${process.env.REACT_APP_API_URL}/users/${username}`)
            .then(res => res.json())
            .then(data => data);

            this.setState({tweets, user, isLoading: false});

        } catch (error) {
            this.setState({ error });
        }
      }

      async handleDeleteTweet(id){

        await fetch(`${process.env.REACT_APP_API_URL}/tweets/${id}`, {
          method: 'DELETE',
          headers: {
            'X-Auth-Token': localStorage.getItem('twitter_clone_token')
          }
        })

        this.populateTweets();
    }

    render(){
        let {tweets, user, error, isLoading, payload } = this.state;

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
                    <img src={user.image} />
                    <p>{tweet.name} </p>
                    <p>@{tweet.username}</p>
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
            {payload && <Link to={`/logout`}><button className="logout-btn">Log out</button></Link>}

            <div className="user-container">
                <div className="user-tweets">
                <h2 className="user-feed-heading">@{user.name}'s feed</h2>
                    {tweets.length ? (
                    <ul className="tweets">{tweetElements}</ul>
                    ) : (
                    <p>No tweets from this user</p>
                    )}
                </div>
                <div className="user-info">
                    {user && <img src={user.image}/>}
                    {user && <p>{user.description}</p>}
                </div>
            </div>
        </div>
        );
    };
}

export default UserTweets;