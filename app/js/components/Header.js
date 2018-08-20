import React, {Component} from 'react';
import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types';
import SearchBar from 'material-ui-search-bar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const styles = {
    root: {
      flexGrow: 1
    },
    flex: {
      flexGrow: 1
    }
  };

const options = [
 'Sort by age',
 'Sort by rating'
];
class Header extends Component {

  constructor(props){
    super(props);
    this.state = {
      anchorEl: null,
      sortIndex: 0
    };
  }

  handleClick = event => {
    event.preventDefault();
    this.setState({anchorEl: event.currentTarget});
  };

  handleMenuClick = index => event => {
    event.preventDefault();
    this.setState({selectedIndex: index, anchorEl: null});
    this.props.sortOrder(index == 0 ? 'age' : 'rating');
  };

  handleClose = () => {
    this.setState({anchorEl: null});
  };

  render(){
    const {classes, toggleForm, search} = this.props;
    const {anchorEl, sortIndex} = this.state;
    const open = Boolean(anchorEl);

    return (
        <div className={classes.root} >
          <AppBar position="fixed">
            <Toolbar className={classes.toolBar}>
              <Hidden smDown>
                <Typography variant="h4" color="inherit" className={classes.flex}>
                DReddit
                </Typography>
              </Hidden>
              <SearchBar
                placeholder="Search..."
                style={{
                  margin: '10px 10px',
                  maxWidth: 280
                }} 
                onChange={(searchValue) => search(searchValue)}
               />
              <Button color="inherit" onClick={toggleForm}>
                <AddIcon />
              </Button>
              <Button color="inherit" onClick={this.handleClick}>
                <MoreVertIcon />
              </Button>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={this.handleClose}
                PaperProps={{
                  style: {
                    width: 200
                  }
                }}>
                {options.map((option, i) => (
                  <MenuItem key={option} selected={i == sortIndex} onClick={this.handleMenuClick(i)}>
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </Toolbar>
          </AppBar>
        </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleForm: PropTypes.func.isRequired,
  sortOrder: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired
};

export default withStyles(styles)(Header);
