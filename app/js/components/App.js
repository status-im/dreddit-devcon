import React, {Component} from 'react';
import Create from './Create';
import Header from './Header';
import Post from './Post';
import _ from 'lodash';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

import EmbarkJS from 'Embark/EmbarkJS';
import DReddit from 'Embark/contracts/DReddit';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true
  }
});

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      'displayForm': false,
      'list': [],
      'sortBy': 'age',
      'sortOrder': 'desc',
      'filterBy': ''
    };
  }

  componentDidMount() {
    // TODO: Invoke this._loadPosts() function as soon as Embark is ready
  }

  _toggleForm = () => {
    this.setState({displayForm: !this.state.displayForm});
  }

  _setSortOrder = (sortBy) => {
    const sortOrder = (this.state.sortOrder == 'asc' && this.state.sortBy == sortBy) || this.state.sortBy != sortBy ? 'desc' : 'asc';
    this.setState({sortBy, sortOrder});
  }

  _loadPosts = async () => {
    // TODO: Using the functions `post` and `numPost` from our contract, load the posts

    let list = [];

    // TODO: replace by using `numPosts` to obtain the number of posts our contract has in storage:
    const total = 1;
    
    if(total > 0){
        for (let i = 0; i < total; i++) {

            // TODO: the constant `currentPost` should have the info that comes from the `post` function of the contract.
            //       Replace this object with the code in the instructions as it just a placeholder.
            const currentPost = {
              upvotes: 0, downvotes: 0, owner: "0x1234567890123456789012345678901234567890", creationDate: "153399", description: "0x00"
            }; 
            list.push(currentPost);
        }

        list = await Promise.all(list);
        list = list.map((value, index) => { 
                      value.id = index; 
                      value.upvotes = parseInt(value.upvotes, 10);
                      value.downvotes = parseInt(value.downvotes, 10);
                      return value; 
                    });
    }
    
    this.setState({list});
  }

  _search = (filterBy) => {
    this.setState({filterBy});
  }

  render() {
    const {displayForm, list, sortBy, sortOrder, filterBy} = this.state;

    let orderedList;
    if(sortBy == 'rating'){
      orderedList = _.orderBy(list, [function(o) { return o.upvotes - o.downvotes; }, 'creationDate'], [sortOrder, sortOrder]);
    } else {
      orderedList = _.orderBy(list, 'creationDate', sortOrder);
    }

    return <MuiThemeProvider theme={theme}>
        <Header toggleForm={this._toggleForm} sortOrder={this._setSortOrder} search={this._search} />
        { displayForm && <Create afterPublish={this._loadPosts} /> }
        { orderedList.map((record) => <Post key={record.id} {...record} filterBy={filterBy} />) }
        </MuiThemeProvider>;
  }
}

export default App;
