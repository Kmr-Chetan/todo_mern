import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input,
  ModalBody,
  InputGroupButtonDropdown,
  InputGroup,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";

import { connect } from "react-redux";
import { addItem, getItems } from "../actions/itemActions";

class ItemModal extends Component {
  state = {
    modal: false,
    name: "",
    user_id: "",
    dropdownOpen: false,
    priority: "low"
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  componentDidMount(){
    this.setState({priority: 'low',name: ''})
  }

  toggleDropDown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { user_id } = this.props.auth;
    const newItem = {
      user_id: user_id,
      item: {
        name: this.state.name,
        priority: this.state.priority,
      },
    };
    if(this.state.name.length){
      this.props.addItem(newItem);
      this.props.getItems(user_id);
    }
    this.toggle();
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  priorityHandler = (e) => {
    this.setState({ priority: e.currentTarget.textContent });
  };

  render() {
    const { isAuthenticated, user_id } = this.props.auth;
    const { dropdownOpen, priority } = this.state;
    return (
      <div>
        {isAuthenticated ? (
          <Button
            color="dark"
            style={{ marginBottom: "2rem" }}
            onClick={this.toggle}
          >
            Add Item
          </Button>
        ) : (
          <div>Login to view and add/delete items</div>
        )}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add Todo</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add to todo bucket"
                  onChange={this.onChange}
                />
                <Label for="item">Set priority</Label>

                <InputGroup>
                  <Input value={priority} onChange={()=>{}} />
                  <InputGroupButtonDropdown
                    addonType="append"
                    isOpen={dropdownOpen}
                    toggle={this.toggleDropDown}
                  >
                    <DropdownToggle caret>Button Dropdown</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={this.priorityHandler}>
                        Urgent
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem onClick={this.priorityHandler}>
                        Medium
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem onClick={this.priorityHandler}>Low</DropdownItem>
                    </DropdownMenu>
                  </InputGroupButtonDropdown>
                </InputGroup>
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { addItem, getItems })(ItemModal);
