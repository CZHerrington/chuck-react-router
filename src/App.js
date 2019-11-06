import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Quote from './components/Quote';
import loadData from './utilities/loadData';

import './App.css';

class CategorySelector extends Component {
  state = {
      loading: true,
      categories: null,
    }

    componentDidMount() {
      this.updateCategories();
    }

  async updateCategories() {
    this.setState({
      loading: true,
    });

    const categories = await loadData('https://api.chucknorris.io/jokes/categories')
      .catch((err) => {
        this.setState({
          loading: false
        })
      });

    this.setState({
      categories,
      loading: false
    });
  }

  render() {
    const { categories } = this.state;
    let component;
    if (this.state.categories) {
      component = (
          <nav className="navbar">
            <ul>
            <li><Link to="/">HOME</Link></li>
              {categories.map((category) => (
                  <li key={category}>
                    <Link to={`/category/${category}`}>{category}</Link>
                  </li>
                )
              )}
            </ul>
          </nav>
        )
    } else {
      component = (
        <nav className="navbar">
          <ul>
            <li>
              [LOADING CATEGORIES]
            </li>
          </ul>
      </nav>
    )}
    return component;
  }
}

function App() {
    return (
      <div className="App">
        <br/>
        <Router>
          <CategorySelector/>
          <Route path="/category/:category" component={Quote}/>
          <Route exact path="/">
            <p>this is the <b>root</b> route</p>
          </Route>
          <br/>
        </Router>
    </div>
    )
}

export default App;
