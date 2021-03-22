import React, { Component } from "react";
import request from '../utils/request'

class App extends Component {

    async componentDidMount() {
        const res = await request('http://localhost:3000/users/testify')
        console.log(res);
    }
    render() {
        return 'hello world'
    }
}

export default App
