import React, { Component } from 'react';
import loadData from '../utilities/loadData';

import './Quote.css'

export default class Quote extends Component {
    state = {
        status: 'waiting for input',
        quote: '',
        fetching: false
    }

    componentDidMount() {
        setInterval(() => {
            if (this.state.fetching === true) {
                const status = this.state.status.length < 50 ? this.state.status + '.' : 'fetching'
                this.setState({status})
            }
        }, 150)
    }

    componentDidUpdate() {
        // this.getQuote()
    }

    getQuote = async () => {
        const { match: { params } } = this.props;

        this.setState({
            fetching: true,
            status: 'fetching',
            quote: 'fetching quotes',
        });
        const data = await loadData(`https://api.chucknorris.io/jokes/random?category=${params.category}`)
        const quote = data.value;
        this.setState({
            quote,
            fetching: false,
            status: 'fetched quote!'
        })
    }



    render() {
        const { quote, status } = this.state;
        const { match: { params } } = this.props;
        return (
            <div className="quote">
                <p><b>status: </b> {status}</p>
                <p><b>category: </b> {params.category}</p>
                <h3>chuck quote:</h3>
                <code>{quote}</code>
                <div>
                    <button onClick={this.getQuote}>get a quote from the {params.category} category</button>
                </div>
            </div>
        )
    }
}