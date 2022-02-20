import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Input, Container } from 'semantic-ui-react'
import Add from './components/Add'
import View from './components/View'

export default class App extends Component {
  initialState = {
    users: [],
    results: [],
    query: '',
  }

  state = this.initialState

  componentDidUpdate(prevProps, prevState) {
    if (prevState.users !== this.state.users) {
      this.resetSearch()
    }
  }

  search = event => {
    const { users } = this.state
    const { value } = event.target

    this.setState({ query: value })

    const results = users.filter(user => {
      const regex = new RegExp(value, 'gi')
      return user.departmentName.match(regex)
    })

    this.setState({ results })
  }

  resetSearch = () => {
    const { users, query } = this.state

    const results = users.filter(user => {
      const regex = new RegExp(query, 'gi')
      return user.departmentName.match(regex)
    })

    this.setState({ results })
  }

  getUserById = id => {
    const { users } = this.state

    const u = users.filter(user => user.departmentName === id)

    return u[0]
  }

  addRow = user => {
    const { users } = this.state

    this.setState({ users: [...users, user] })
  }

  updateRow = (id, updatedUser) => {
    const { users } = this.state

    this.setState({
      users: users.map(user => (user.departmentName === id ? updatedUser : user)),
    })
  }

  deleteRow = id => {
    const { users } = this.state

    this.setState({
      users: users.filter(user => user.departmentName !== id),
    })
  }

  render() {
    const { users, results, query } = this.state
    const data = results.length === 0 && !query ? users : results

    return (
      <Container>
        <Add addRow={this.addRow} />
        <Input icon="search" onChange={this.search} placeholder="Search By Name" />
        <View
          data={data}
          deleteRow={this.deleteRow}
          updateRow={this.updateRow}
          getUserById={this.getUserById}
        />
      </Container>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
