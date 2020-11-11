import React from 'react';
import axios from 'axios';

class Login extends React.Component {
    state = {
        credentials: {
            username: '',
            password: ''
        },
        isLoading: false
    }

    
    handleChange = e => {
        this.setState({
            credentials: {...this.state.credentials,
            [e.target.name]:e.target.value }
        })
    }

    login = e => {
        e.preventDefault(); 
        this.setState({...this.state,
            isLoading: true
        });
        axios.post(`http://localhost:5000/api/login`, this.state.credentials)
            .then(req => {
                localStorage.setItem('token', req.data.payload);
                this.props.history.push('/protected');
                this.setState({...this.state,
                    isLoading: false
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div>
                {this.state.isLoading ? <p>Logging in...</p> : null}
                <form onSubmit={this.login}>
                    Username
                    <input
                    name='username'
                    type='text'
                    value={this.state.credentials.username}
                    onChange={this.handleChange}
                    />
                    Password
                    <input
                    name='password'
                    type='password'
                    value={this.state.credentials.password}
                    onChange={this.handleChange}
                    />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default Login;
