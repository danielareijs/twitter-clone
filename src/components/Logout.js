import React from 'react';

class Logout extends React.Component {
    async componentDidMount() {
        const { history } = this.props;

        localStorage.removeItem('twitter_clone_token');

        await new Promise((resolve) => {
            setTimeout(resolve, 2000);
          });
        
        history.replace('/');
    }

    render() {
        return (
        <div>Logging out...</div>
        );
    }
}

export default Logout;