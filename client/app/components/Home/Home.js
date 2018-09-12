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
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCurrencyChange(eventKey, event) {
    this.setState({ [event.target.name]: eventKey });
  }

  validate (evt) {
    const { state } = evt
    if (!state.name) {
      return this.setState({ 
        showError: true,
        errorMessage: 'Order name is required'
      })
    }
    if (!state.price) {
      return this.setState({ 
        showError: true,
        errorMessage: 'Order price is required'
      })
    }
    if (!state.creditCardCVV) {
      return this.setState({ 
        showError: true,
        errorMessage: 'Credit card CVV is required'
      })
    }
    if (!state.creditCardExp) {
      return this.setState({ 
        showError: true,
        errorMessage: 'Credit card Expery date is required'
      })
    }
    if (!state.creditCardName) {
      return this.setState({ 
        showError: true,
        errorMessage: 'Credit card holder name is required'
      })
    }
    if (!state.creditCardNum) {
      return this.setState({ 
        showError: true,
        errorMessage: 'Credit card number is required'
      })
    }
    return true
  }

  handleSubmit(event) {
    event.preventDefault();
    let queryString = ``;
    const validateFlag = this.validate({ state: this.state })
    if (!typeof validateFlag === 'boolean') {
      fetch(`http://localhost:8000/pay?${queryString}`)
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
  }

  render() {
    return (
      <form className='web-analyzer'>
        <FormGroup controlId='payment-form'>
        <Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">
          <Tab eventKey={1} title="Order Details">
            <FormControl
              type="number"
              value={this.state.price}
              placeholder='Price'
              onChange={this.handleChange}
              require={'true'}
              name='price'
            />
            <br/>
            <SplitButton
              // bsStyle={title}
              title='Currency'
              key='currecny'
              require={'true'}
              name='currency'
              id='currency'
            >
              <MenuItem active={'true'} onSelect={this.handleCurrencyChange} name='currency' eventKey={'USD'}>{'USD'}</MenuItem>
              <MenuItem onSelect={this.handleCurrencyChange} name='currency' eventKey={'EUR'}>{'EUR'}</MenuItem>
              <MenuItem onSelect={this.handleCurrencyChange} name='currency' eventKey={'THB'}>{'THB'}</MenuItem>
              <MenuItem onSelect={this.handleCurrencyChange} name='currency' eventKey={'HKD'}>{'HKD'}</MenuItem>
              <MenuItem onSelect={this.handleCurrencyChange} name='currency' eventKey={'SGD'}>{'SGD'}</MenuItem>
              <MenuItem onSelect={this.handleCurrencyChange} name='currency' eventKey={'AUD'}>{'AUD'}</MenuItem>
            </SplitButton>
            <br/>          
            <FormControl
              type="text"
              value={this.state.name}
              placeholder='Your Name'
              onChange={this.handleChange}
              require={'true'}
              name='name'
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
                name='creditCardName'
              />
              <br/>
              <FormControl
                type="test"
                value={this.state.creditCardNum}
                placeholder='Credit card number'
                onChange={this.handleChange}
                require={'true'}
                name='creditCardNum'
              />
              <br/>
              <FormControl
                type="test"
                value={this.state.creditCardExp}
                placeholder='Credit card expiration'
                onChange={this.handleChange}
                require={'true'}
                name='creditCardExp'
              />
              <br/>
              <FormControl
                type="number"
                value={this.state.creditCardCVV}
                placeholder='Credit card CVV'
                onChange={this.handleChange}
                require={'true'}
                name='creditCardCVV'
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
