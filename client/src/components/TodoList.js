import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { getItems, deleteItem } from "../actions/itemActions";


class TodoList extends Component {
  componentDidMount() {
    this.props.getItems();
  }
  deleteItemHandler = (id) => {
    this.props.deleteItem(id);
  };
  render() {
    const { isAuthenticated } = this.props.auth;
    const { items } = this.props.item;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({_id, name }) => (
                <CSSTransition key={_id} timeout={500}>
                  <ListGroupItem >
                  
                    {name}
                    {isAuthenticated && (<Button
                      className="remove-btn float-right"
                      color="danger"
                      size="sm"
                      onClick={() => {
                        this.deleteItemHandler(_id);
                      }}
                    >
                      delet
                    </Button>)}
                  </ListGroupItem>
                </CSSTransition>
              ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  item: state.item,
  auth: state.auth,
});

export default connect(mapStateToProps, { getItems, deleteItem })(TodoList);
