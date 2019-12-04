import React, { Component } from 'react'
import izitoast from 'izitoast'
import { handleInput } from '../util/handleInput'
import {
  Redirect
} from 'react-router-dom'

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      redirect: false,
      login: null,
      password: null,
    }

    this.handleInput = handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  login() {
    return this.state.login === 'admin' && this.state.password === 'admin'
  }

  handleSubmit(e) {
    e.preventDefault()
    
    if (this.login()) {
      window.localStorage.setItem('logged', true)
      this.setState({ redirect: true })
    } else {
      izitoast.error({
        title: 'Erro',
        message: 'Dados incorretos'
      })
    }
  }

  render() {
    return (
      <div className="Login">
        { this.state.redirect &&
          <Redirect to="/weather" />
        }
        <form onSubmit={this.handleSubmit}>
          <label>
            Login
            <input
              onChange={this.handleInput}
              name="login"
              type="text"
              placeholder="Login"
            />
          </label>

          <label>
            Senha
            <input
              onChange={this.handleInput}
              name="password"
              type="password"
              placeholder="Senha"
            />
          </label>

          <input type="submit" value="Logar" />
        
        </form>
      </div>
    )
  }
}
