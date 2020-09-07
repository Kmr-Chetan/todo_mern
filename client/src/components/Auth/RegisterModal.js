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
  NavLink,
  Alert,
} from "reactstrap";
import { register } from "../../actions/authActions";
import { clearErrors  } from "../../actions/errorActions";
import { connect } from "react-redux";

class RegiterModal extends Component {

  state = {
    modal: false,
    name: "",
    email: "",
    password: "",
    msg: null,
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error ) {
       if( error.id === "REGISTER_FAIL"){
        this.setState({
            msg:  error.msg.msg
        })
    }
        else {
            this.setState({
                msg:  null
            })
        } 
      }
      if(this.state.modal){
          if(isAuthenticated){
              this.toggle()
          }
      }
  }

  toggle = () => { 
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const newUser = {
      name,
      email,
      password,
    };
    this.props.register(newUser);

  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Register
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
             {this.state.msg && 
                <Alert color="danger">
                    {this.state.msg}
                </Alert>}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Name"
                  onChange={this.onChange}
                />
                <Label for="item">email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={this.onChange}
                />
                <Label for="item">password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                 Register
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
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});
export default connect(mapStateToProps, { register, clearErrors })(RegiterModal);
