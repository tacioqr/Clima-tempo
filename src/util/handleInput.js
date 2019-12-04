export function handleInput(e) {
  e.preventDefault()
  const { name, value } = e.target

  this.setState({ [name]: value })
}
