import PropTypes from "prop-types";
import styled from "styled-components";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import slugify from "slugify";
import shortid from "shortid";

const CategoriesStyles = styled.div``;

class Categories extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({ boardId: PropTypes.string })
    }).isRequired,
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
    dispatch: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired
  };

  constructor() {
    super();
    this.state = {
      categoryName: "",
      categoryShort: "",
      categoryColor: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { match, history, boardTitle, dispatch } = this.props;
    const { boardId } = match.params;
    const { categoryName, categoryShort, categoryColor } = this.state;
    const categoryId = shortid.generate();
    const category = {
      name: categoryName,
      short: categoryShort,
      color: categoryColor,
      _id: categoryId
    };

    dispatch({
      type: "ADD_CATEGORY",
      payload: {
        boardId,
        category
      }
    });
    history.push(
      `/b/${boardId}/${slugify(boardTitle, {
        lower: true
      })}`
    );
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render = () => {
    const { categoryName, categoryShort, categoryColor } = this.state;
    const { categories } = this.props;
    const filteredCategories = categories.filter(
      category => category.name !== ""
    );

    return (
      <CategoriesStyles>
        <h2>Categories</h2>
        <ul>
          {filteredCategories.map(category => (
            <li>
              {category.name} - {category.short} - {category.color}
            </li>
          ))}
        </ul>
        <h3>Add a new Category:</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="categoryName">Name:</label>
          <input
            type="text"
            name="categoryName"
            value={categoryName}
            onChange={this.handleChange}
            id="categoryName"
          />
          <label htmlFor="categoryShort">Short:</label>
          <input
            type="text"
            name="categoryShort"
            value={categoryShort}
            onChange={this.handleChange}
            id="categoryShort"
          />
          <label htmlFor="categoryColor">Color:</label>
          <input
            type="text"
            name="categoryColor"
            value={categoryColor}
            onChange={this.handleChange}
            id="categoryColor"
          />
          <input type="submit" value="Add Category" />
        </form>
      </CategoriesStyles>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  const { boardId } = ownProps.match.params;
  return {
    boardTitle: state.boardsById[boardId].title,
    categories: state.boardsById[boardId].settings.categories
  };
};

export default withRouter(connect(mapStateToProps)(Categories));
