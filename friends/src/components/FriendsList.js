import React from 'react';


import { axiosWithAuth } from './../utils/axiosWithAuth';

import styled from 'styled-components';

const Container = styled.div`
    width: 50%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border-radius: 5px;
    box-shadow: 0 1px 6px -2px #000;
    background-color: lightgray;
    margin-bottom: 1%;
    margin: auto;
    margin-top: 5%;
    align-items: center;
`

class FriendsList extends React.Component {
    state = {
        friends: [],
        name: '',
        age: '',
        email: ''
    };

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        axiosWithAuth().get('/friends')
            .then(req => {
                this.setState({
                    friends: req.data
                })
                console.log(req.data)
            })
            .catch(err => {
                console.log(err);
            })
    }

    handleChanges = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    submitFriend = e => {
        e.preventDefault();
        this.setState({
            ...this.state,
            friends: [...this.state.friends, {
                name: this.state.name,
                age: this.state.age,
                email: this.state.email
            }]
        })
        axiosWithAuth().post('/friends', this.state.friends[this.state.friends.length-1])
            .then(req => {
                localStorage.setItem('token', req.data.payload);
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return(
            <div>
                <form onSubmit={this.submitFriend}>
                    Name
                    <input
                    name='name'
                    type='text'
                    value={this.state.name}
                    onChange={this.handleChanges}
                    />
                    Age
                    <input
                    name='age'
                    type='text'
                    value={this.state.age}
                    onChange={this.handleChanges}
                    />
                    Email
                    <input
                    name='email'
                    type='text'
                    value={this.state.email}
                    onChange={this.handleChanges}
                    />
                    <button>Submit</button>
                </form>
                {this.state.friends.map(friend => {
                    return (
                        <Container>
                        <div>Name: {friend.name}</div>
                        <div>Age: {friend.age}</div>
                        <div>Email: {friend.email}</div>
                        </Container>
                    )
                })}
            </div>
        )
    }


}

export default FriendsList;