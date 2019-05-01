import Modal from "styled-react-modal";
import React, { Component } from "react";

const StyledModal = Modal.styled`
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.white};
`;

class FancyModalButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(e) {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <div>
        <button onClick={this.toggleModal}>Click me</button>
        <StyledModal
          isOpen={this.state.isOpen}
          onBackgroundClick={this.toggleModal}
          onEscapeKeydown={this.toggleModal}
        >
          <span>I am a modal!</span>
          <button onClick={this.toggleModal}>Close me</button>
        </StyledModal>
      </div>
    );
  }
}

export default FancyModalButton;
