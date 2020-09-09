import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { getItems, deleteItem } from "../actions/itemActions";
import "./TodoList.css";

class TodoList extends Component {
  componentDidUpdate(prevProps, prevState) {
    const { isAuthenticated, user_id } = this.props.auth;
    if (isAuthenticated !== null) {
      if (prevProps.auth.user_id !== user_id) {
        this.props.getItems(user_id);
      }
    }
  }

  deleteItemHandler = (user_id, id) => {
    this.props.deleteItem(user_id, id);
    this.props.getItems(user_id);
  };

  render() {
    const { isAuthenticated, user_id } = this.props.auth;
    const items =
      this.props &&
      this.props.item &&
      this.props.item.items &&
      this.props.item.items[0] &&
      this.props.item.items[0].item;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items &&
              items.map(({ _id, name, priority }) => (
                <CSSTransition key={_id} timeout={500}>
                  {isAuthenticated && (
                    <ListGroupItem>
                      {name}
                      <span className="priorty">{priority}</span>
                      <Button
                        className="remove-btn float-right"
                        color="danger"
                        size="sm"
                        onClick={() => {
                          this.deleteItemHandler(user_id, _id);
                        }}
                      >
                        delete
                      </Button>
                    </ListGroupItem>
                  )}
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
