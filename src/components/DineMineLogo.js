import React from 'react';
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";

class DineMineLogo extends React.Component {
  state = {
    redirect: false
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/target' />
    }
  }
  render () {
    return (
       <div>
        {this.renderRedirect()}
        <button onClick={this.setRedirect}>Redirect</button>
       </div>
    )
  }
}
