import React, { Component } from 'react'
import { Form, Modal, Button } from 'semantic-ui-react'

class Add extends Component {
  initialState = {
    form: {
      departmentName: '',
      departmentDetails: '',
    },
  }

  state = this.initialState

  handleChange = event => {
    const { name, value } = event.target

    this.setState({
      form: { ...this.state.form, [name]: value },
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    const { departmentName, departmentDetails } = this.state.form
    const { addRow } = this.props

    const newUser = {
      departmentName,
      departmentDetails,
    }

    addRow(newUser)
    this.setState(this.initialState)
  }

  render() {
    const { departmentName, departmentDetails } = this.state.form

    return (
      <Modal trigger={<Button content="Add New User" />} closeIcon>
        <Modal.Header>Add New User</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <Form.Input
                label="Department Name"
                name="departmentName"
                value={departmentName}
                onChange={this.handleChange}
                autoFocus={true}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                label="Department Details"
                name="departmentDetails"
                value={departmentDetails}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Button type="submit" content="Submit" disabled={!departmentName || !departmentDetails} />
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

export default Add
