import React from "react";
import { Link } from "react-router-dom";

class Tweet extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            
        }
    }

    async handleDeleteTweet(id){

        await fetch(`${process.env.REACT_APP_API_URL}/tweets/${id}`, {
          method: 'DELETE',
          headers: {
            'X-Auth-Token': localStorage.getItem('twitter_clone_token')
          }
        })

        this.props.populateTweets();
    }

    render(){
        const {tweet, payload} = this.props;
        const date = tweet.created_at.split('').splice(0,10).join('');

        return (
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
    }
}

export default Tweet;