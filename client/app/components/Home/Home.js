import React, { Component } from 'react';
import { FormGroup, FormControl, Button, Alert, Label, Table, SplitButton, MenuItem, Tabs, Tab } from 'react-bootstrap';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showError: false,
      value: null,
      errorMessage: null,
      creditCardName: null,
      creditCardNum: null,
      creditCardExp: null,
      creditCardCVV: null,
      price: null,
      currency: null,
      name: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();    
    fetch(`http://localhost:8000/fetch-html?pageURL=${this.state.value}`)
        .then((data) => {
          
        })
        .catch((err) => {
          console.error(err)
          this.setState({ 
            showError: true,
            errorMessage: err.message
          })
        })
  }

  render() {
    return (
      <form className='web-analyzer'>
        <FormGroup controlId="formBasicText">
        <Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">
          <Tab eventKey={1} title="Order Details">
            <FormControl
              type="number"
              value={this.state.price}
              placeholder='Price'
              onChange={this.handleChange}
              require={'true'}
            />
            <br/>
            <SplitButton
              // bsStyle={title}
              title='Currency'
              key='currecny'
              id={`split-button-basic`}
            >
              <MenuItem eventKey="1">{'USD'}</MenuItem>
              <MenuItem eventKey="2">{'EUR'}</MenuItem>
              <MenuItem eventKey="3">{'THB'}</MenuItem>
              <MenuItem eventKey="4">{'HKD'}</MenuItem>
              <MenuItem eventKey="3">{'SGD'}</MenuItem>
              <MenuItem eventKey="4">{'AUD'}</MenuItem>
            </SplitButton>
            <br/>          
            <FormControl
              type="text"
              value={this.state.name}
              placeholder='Your Name'
              onChange={this.handleChange}
              require={'true'}
            />
            <br/> 
            </Tab>
            <Tab eventKey={2} title="Payment Details">
              <FormControl
                type="text"
                value={this.state.creditCardName}
                placeholder='Credit card holder name'
                onChange={this.handleChange}
                require={'true'}
              />
              <br/>
              <FormControl
                type="test"
                value={this.state.creditCardNum}
                placeholder='Credit card number'
                onChange={this.handleChange}
                require={'true'}
              />
              <br/>
              <FormControl
                type="test"
                value={this.state.creditCardExp}
                placeholder='Credit card expiration'
                onChange={this.handleChange}
                require={'true'}
              />
              <br/>
              <FormControl
                type="number"
                value={this.state.creditCardCVV}
                placeholder='Credit card CVV'
                onChange={this.handleChange}
                require={'true'}
              />
              <br/>
            </Tab>
          </Tabs>
          <Button type='submit' onClick={this.handleSubmit}>Submit</Button>
        </FormGroup>
        { this.state.showError && (
          <Alert bsStyle="warning">
            <strong>Oh Snap!</strong> {this.state.errorMessage}
          </Alert>
        )}
      </form>
    )
  }
}

export default Home;
