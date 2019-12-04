import ConnectionFactory from './ConnectionFactory'
import WeatherDao from '../dao/WeatherDao'

const KEY_API = '2e502fd0'
const BASE_URL_API = 'https://api.hgbrasil.com/weather'

export default class WeatherService {

  _handleErrors(res) {
      if(!res.ok) throw new Error(res.statusText);
      return res;
  }

  getWeather(city) {
    return fetch(`${BASE_URL_API}?format=json-cors&key=${KEY_API}&city_name=${city}`)
      .then(res => this._handleErrors(res))
      .then(res => res.json())
  }

  async save(data = {}) {
    let resultApi
    try {
      resultApi = await this.getWeather(data.city)
    } catch (err) {
      console.log(err)
      let message = `Erro de comunicação com a api: ${BASE_URL_API}`
      alert(message)
      throw new Error(message)
    }

    data.api = resultApi

    return ConnectionFactory
      .getConnection()
      .then(connection => new WeatherDao(connection))
      .then(dao => dao.save(data))
      .then(() => 'Adicionado com sucesso')
      .catch(error => {
        console.log(error)
        throw new Error('Erro ao salvar')
      })
  }

  async edit(data = {}) {
    let result = await this.getWeather(data.city)

    data.api = result

    return ConnectionFactory
      .getConnection()
      .then(connection => new WeatherDao(connection))
      .then(dao => dao.edit(data))
      .then(() => 'Editado com sucesso')
      .catch(error => {
        console.log(error)
        throw new Error('Erro ao editar')
      })
  }

  getList() {
    return ConnectionFactory
      .getConnection()
      .then(connection => new WeatherDao(connection))
      .then(dao => dao.getList())
      .catch(error => {
        console.log(error)
        throw new Error('Erro ao obter a lista')
      })
  }

  delete(key) {
    return ConnectionFactory
      .getConnection()
      .then(connection => new WeatherDao(connection))
      .then(dao => dao.delete(key))
      .catch(error => {
        console.log(error)
        throw new Error('Error ao deletar')
      })
  }

  get(key) {
    return ConnectionFactory
      .getConnection()
      .then(connection => new WeatherDao(connection))
      .then(dao => dao.get(key))
      .catch(error => {
        console.log(error)
        throw new Error('Erro ao buscar registro')
      })
  }
}
