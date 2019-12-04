export default class WeatherDao {
  constructor(connection) {
    this._connection = connection
    this._store = 'weather'
  }

  save(data) {
    return new Promise((resolve, reject) => {
      let request = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .add(data)

      request.onsuccess = e => {
        resolve()
      }

      request.onError = e => {
        console.log(e.target.error)
        reject('Não foi possível salvar')
      }
    })
  }

  edit(data) {
    return new Promise((resolve, reject) => {
      let request = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .put(data, data.key)

      request.onsuccess = e => {
        resolve()
      }

      request.onError = e => {
        console.log(e.target.error)
        reject('Não foi possível editar')
      }
    })
  }

  getList() {
    return new Promise((resolve, reject) => {

      let cursor = this._connection
          .transaction([this._store], 'readonly')
          .objectStore(this._store)
          .openCursor()

      let list = []

      cursor.onsuccess = e => {
        let cursor = e.target.result

        if(cursor) {
          const { key, value } = cursor
          list.push({
            key,
            ...value,
          })
          cursor.continue()
        } else {
          resolve(list)
        }
      }

      cursor.onerror = e => {
        console.log(e.target.error)
        reject('Não foi possível listar')
      }

    })
  }

  delete(key) {
    return new Promise((resolve, reject) => {
      let request = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .delete(key)

      request.onsuccess = e => {
        resolve()
      }

      request.onError = e => {
        console.log(e.target.error)
        reject('Não foi possível excluir')
      }
    })
  }

  get(key) {
    return new Promise((resolve, reject) => {
      let request = this._connection
        .transaction([this._store], 'readonly')
        .objectStore(this._store)
        .get(key)

      request.onsuccess = e => {
        resolve({
          key,
          ...e.target.result
        })
      }

      request.onerror = e => {
        reject('Erro ao consultar o registro')
      }
    })
  }
}