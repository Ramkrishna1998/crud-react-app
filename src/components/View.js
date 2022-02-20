import React, { Component } from 'react'
import { Table, Button } from 'semantic-ui-react'
import Edit from './Edit.js'

class View extends Component {
  state = {
    isOpen: false,
    id: '',
  }

  onClose = () => {
    this.setState({ isOpen: false })
  }

  onOpen = () => {
    this.setState({ isOpen: true, id: this.props.id })
  }

  render() {
    const { isOpen, id } = this.state
    const { data, deleteRow, updateRow, getUserById } = this.props

    return (
      <div>
        <Edit
          onClose={this.onClose}
          isOpen={isOpen}
          id={id}
          updateRow={updateRow}
          getUserById={getUserById}
        />
        <Table sortable celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Department Name</Table.HeaderCell>
              <Table.HeaderCell>Department Details</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map(row => (
              <Table.Row key={row.departmentName}>
                <Table.Cell>{row.departmentName}</Table.Cell>
                <Table.Cell>{row.departmentDetails}</Table.Cell>
                <Table.Cell>
                  <Button
                    content="Edit"
                    onClick={() => {
                      this.setState({ isOpen: true, id: row.departmentName })
                    }}
                  />
                  <Button
                    content="Delete"
                    onClick={() => {
                      deleteRow(row.departmentName)
                    }}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    )
  }
}

export default View
