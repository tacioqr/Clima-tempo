import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { handleInput } from '../util/handleInput'
import WeatherService from '../services/WeatherService'
import iziToast from 'izitoast'
import TableWeather from './TableWeather'

export default class Weather extends Component {
  constructor(props) {
    super(props)

    this.stateInitialForm = {
      key: null,
      name: '',
      city: '',
    }

    this.state = {
      redirect: false,
      list: [],
      ...this.stateInitialForm,
    }

    this.service = new WeatherService()

    this.handleInput = handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleEdit = this.handleEdit.bind(this)

    this.verifyLogged()
  }

  componentDidMount() {
    this.setList()
  }

  verifyLogged() {
    if (!window.localStorage.getItem('logged')) {
      this.setState({ redirect: true })
    }
  }

  setList() {
    this.service.getList()
      .then(list => {
        this.setState({
          list
        })
      })
      .catch(error => {
        iziToast.error({
          message: error
        })
      })
  }

  handleSubmit(e) {
    e.preventDefault()
    
    const { key, name, city } = this.state
    
    let data = {
      name,
      city
    }
    
    if (key) data.key = key

    this.service[key ? 'edit' : 'save'](data)
    .then((res) => {
      console.log(res)
      iziToast.success({
        message: key ? 'Atualizado com sucesso' : 'Cadastrado com sucesso'
      })
      this.setList()
      this.setState(this.stateInitialForm)
    })
    .catch(error => {
      console.log(error)
      iziToast.error({
        message: 'Erro ao cadastrar'
      })
    })
  }

  handleDelete(key) {
    this.service.delete(key)
      .then(() => {
        iziToast.success({
          message: 'Excluído com sucesso'
        })
        this.setList()
      })
      .catch(error => {
        console.log(error)
        iziToast.error({
          message: 'Error ao excluir'
        })
      })
  }

  handleEdit(key) {
    this.service.get(key)
      .then(data => {
        this.setState({
          key: data.key,
          name: data.name,
          city: data.city,
        })
      })
  }

  render() {
    return (
      <div className="Weather">
        { this.state.redirect &&
          <Redirect to="/" />
        }

        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              Nome
              <input
                onChange={this.handleInput}
                value={this.state.name}
                name="name"
                type="text"
                placeholder="Nome"
              />
            </label>
          </div>

          <div>
            <label>
              Cidade
              <input
                onChange={this.handleInput}
                value={this.state.city}
                name="city"
                type="text"
                placeholder="Cidade"
              />
            </label>
          </div>

          <input type="submit" value="Cadastrar" />
        </form>

          <TableWeather
            onDelete={this.handleDelete}
            onEdit={this.handleEdit}
            items={this.state.list}
          />
      </div>
    )
  }
}
