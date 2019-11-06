import React, { Component } from 'react';
import loadData from '../utilities/loadData';

export default class Quote extends Component {
    state = {
        status: 'waiting for input',
        quote: '',
        fetching: false
    }

    componentDidMount() {
        setInterval(() => {
            if (this.state.fetching === true) {
                this.setState({status: this.state.status + '.'})
            }
        }, 250)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.category !== this.props.category) {
            this.getQuote();
        }
    }

    getQuote = async () => {
        const { category } = this.props;
        this.setState({
            fetching: true,
            status: 'fetching',
            quote: 'fetching quotes',
        });
        const data = await loadData(`https://api.chucknorris.io/jokes/random?category=${category}`);

        const quote = data.value;
        this.setState({
            quote,
            fetching: false,
            status: 'fetched quote!'
        })
    }



    render() {
        const { quote, status } = this.state;
        const { category } = this.props;
        return (
            
                <div>
            <p><b>status: </b> {status}</p>
            <h3>chuck quote:</h3>
            <code>{quote}</code>
            <div>
                <button onClick={this.getQuote}>get a quote from the {category} category</button>
            </div>
            </div>
        )
    }
}