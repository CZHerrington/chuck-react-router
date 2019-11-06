import React, { Component } from 'react';
import Quote from './components/Quote';
import loadData from './utilities/loadData';

import './App.css';

class CategorySelector extends Component {
  state = {
      loading: true,
      categories: ['fetching categories...'],
    }

    componentDidMount() {
      this.updateCategories();
    }

  async updateCategories() {
    this.setState({
      loading: true,
    });

    const categories = await loadData('https://api.chucknorris.io/jokes/categories');

    this.setState({
      categories,
      loading: false
    });
  }

  render() {
    const { categories } = this.state;
    return (
      <select>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
      </select>
    )
  }
}

class App extends Component {
  state = {
    category: 'dev'
  }

  render() {
    const { category } = this.state;
    return (
      <div className="App">
      <br/>
      <Quote category={category}/>
      <br/>
      <CategorySelector/>
    </div>
    )
  }
}

export default App;
