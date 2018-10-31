import React, {Component, Fragment} from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';

import EmbarkJS from 'Embark/EmbarkJS';
import web3 from 'Embark/web3';
import DReddit from 'Embark/contracts/DReddit';

const styles = theme => ({
  textField: {
    marginRight: theme.spacing.unit * 2
  }
});

class Create extends Component{

  constructor(props){
    super(props);
    
    this.state = {
      'title': '',
      'content': '',
      'isSubmitting': false,
      'error': ''
    };
  }

  handleClick = async event => {
    event.preventDefault();

    if(this.state.title.trim() == ''){
      this.setState({'error': 'Required field'});
      return;
    }

    this.setState({
      isSubmitting: true, 
      error: ''
    });

    
    const textToSave = {
      'title': this.state.title,
      'content': this.state.content
    };

    const ipfsHash = await EmbarkJS.Storage.saveText(JSON.stringify(textToSave));

    const {create} = DReddit.methods;    
    const toSend = await create(web3.utils.toHex(ipfsHash));
    const estimatedGas = await toSend.estimateGas();

    const receipt = await toSend.send({from: web3.eth.defaultAccount, gas: estimatedGas + 1000});

    this.setState({
      isSubmitting: false,
      content: '',
      title: ''
    });

    this.props.afterPublish();
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render(){
    const {classes} = this.props;
    const {error, content, title, isSubmitting} = this.state;

    return (<Fragment>
      <Card>
        <CardContent>
          <TextField
            id="title"
            label="Title"
            error={error != ""}
            multiline
            rowsMax="20"
            fullWidth
            value={title}
            helperText={error}
            onChange={this.handleChange('title')}
            className={classes.textField}
            margin="normal" />
          <TextField
            id="description"
            label="Description"
            error={error != ""}
            multiline
            rowsMax="20"
            fullWidth
            value={content}
            helperText={error}
            onChange={this.handleChange('content')}
            className={classes.textField}
            margin="normal" />
          {
            <Button variant="contained" color="primary" onClick={this.handleClick} disabled={isSubmitting }>Publish</Button>
          }
        </CardContent>
      </Card>
      { this.state.isSubmitting && <LinearProgress /> }
      </Fragment>
    );
  }
}

Create.propTypes = {
  classes: PropTypes.object.isRequired,
  afterPublish: PropTypes.func.isRequired
};

export default withStyles(styles)(Create);
