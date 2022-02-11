import React from "react";
import jwtDecode from 'jwt-decode';

class CreateTweet extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            tweetInput: '',
            payload: {},
            error: null
        }
    }

    componentDidMount(){
        this.setState({error: null})
        const token = localStorage.getItem('twitter_clone_token')
        const payload = jwtDecode(token);

        this.setState(payload);

    }

    handleChange(e){
        this.setState({tweetInput: e.target.value})
    }

    async handleSubmit(){
        if(this.state.tweetInput.length < 1){
            this.setState({error: "Can not post empy tweet"})
            return;
        }
        
        await fetch(`${process.env.REACT_APP_API_URL}/tweets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('twitter_clone_token')

            },
            body: JSON.stringify({message: this.state.tweetInput}),
        })

        this.props.populateTweets();
    }

    render(){
        return(
            <>
                {this.state.error && <div className="error-message">{this.state.error}</div>} 
                <div className="tweet-input">
                    <input type="text" onChange={(e) => this.handleChange(e)}/>
                    <input type="submit" value="Tweet" onClick={() => this.handleSubmit()}/>
                </div>
            </>
        )
    }
}

export default CreateTweet;