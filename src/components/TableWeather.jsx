import React, { Component } from 'react'

export default class TableWeather extends Component {
  constructor(props) {
    super(props)

    this.handleDelete = this.handleDelete.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  handleDelete(key) {
    this.props.onDelete(key)
  }

  handleEdit(key) {
    this.props.onEdit(key)
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cidade</th>
            <th>Vel.Vento</th>
            <th>Humidade</th>
            <th>Situação atual</th>
            <th>Temperatura</th>
            <th>Periodo do dia</th>
            <th>Hora nascer do Sol</th>
            <th>Hora por do Sol</th>
            <th>Hora atual</th>
            <th>Data atual</th>

          </tr>
        </thead>
        <tbody>
          { this.props.items.map(item => 
            <tr key={ item.key }>
              <td>{ item.name }</td>
              <td>{ item.city }</td>
              <td>{ item.api.results.wind_speedy }</td>
              <td>{ item.api.results.humidity }</td>
              <td>{ item.api.results.description }</td>
              <td>{ item.api.results.temp }</td>
              <td>{ item.api.results.currently }</td>
              <td>{ item.api.results.sunrise }</td>
              <td>{ item.api.results.sunset }</td>
              <td>{ item.api.results.time }</td>
              <td>{ item.api.results.date }</td>
              <td>
                <button onClick={e => this.handleDelete(item.key, e)}>Excluir</button>
              </td>
              <td>
                <button onClick={e => this.handleEdit(item.key, e)}>Editar</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}
