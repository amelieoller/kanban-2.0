import PropTypes from "prop-types";
import styled from "styled-components";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import shortid from "shortid";
import { FiX } from "react-icons/fi";

const CategoriesStyles = styled.div`
  .edit-category-form {
    .edit-category {
      background: transparent;
      border: none;
      font-size: 16px;
    }
  }
`;

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
      categoryColor: "",
      defaultCategory: "none"
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { categoryName, categoryShort, categoryColor } = this.state;
    if (!categoryName || !categoryShort || !categoryColor) return;

    const { match, dispatch } = this.props;
    const { boardId } = match.params;
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
  };

  handleNewCategoryChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleEditCategoryChange = (e, id, type) => {
    this.setState({
      [`${id}-${type}`]: e.target.value
    });
  };

  handleEditCategorySubmit = (e, categoryId, oldName, oldShort, oldColor) => {
    e.preventDefault();
    const { match, dispatch } = this.props;
    const { boardId } = match.params;
    const name = this.state[`${categoryId}-name`] || oldName;
    const short = this.state[`${categoryId}-short`] || oldShort;
    const color = this.state[`${categoryId}-color`] || oldColor;
    dispatch({
      type: "CHANGE_CATEGORY",
      payload: {
        boardId,
        categoryId,
        name,
        short,
        color
      }
    });
  };

  handleDelete = categoryId => {
    const { match, dispatch } = this.props;
    const { boardId } = match.params;
    dispatch({
      type: "DELETE_CATEGORY",
      payload: {
        boardId,
        categoryId
      }
    });
  };

  handleDefaultCategoryChange = categoryId => {
    const { match, dispatch } = this.props;
    const { boardId } = match.params;
    dispatch({
      type: "CHANGE_DEFAULT_CATEGORY",
      payload: {
        boardId,
        categoryId
      }
    });
  };

  render = () => {
    const { categoryName, categoryShort, categoryColor } = this.state;
    const { categories, defaultCategory } = this.props;
    const filteredCategories = categories.filter(
      category => category.name !== ""
    );

    return (
      <CategoriesStyles>
        <h2>Categories</h2>
        <h3>Set Default Category:</h3>
        <form>
          {filteredCategories.map(category => (
            <label key={category._id}>
              <input
                type="radio"
                value={category._id}
                checked={defaultCategory === category._id}
                onChange={() => this.handleDefaultCategoryChange(category._id)}
              />
              {category.name}
            </label>
          ))}
          <label key="none">
            <input
              type="radio"
              value="none"
              checked={defaultCategory === "none"}
              onChange={() => this.handleDefaultCategoryChange("none")}
            />{" "}
            none
          </label>
        </form>
				<h3>Edit Categories:</h3>
        {filteredCategories.map(category => (
          <form
            action=""
            className="edit-category-form"
            onSubmit={e =>
              this.handleEditCategorySubmit(
                e,
                category._id,
                category.name,
                category.short,
                category.color
              )
            }
            key={category._id}
          >
            <input
              className="edit-category"
              type="text"
              value={this.state[`${category._id}-name`] || category.name}
              name="name"
              onChange={e =>
                this.handleEditCategoryChange(e, category._id, "name")
              }
            />
            <input
              className="edit-category"
              type="text"
              value={this.state[`${category._id}-short`] || category.short}
              name="short"
              onChange={e =>
                this.handleEditCategoryChange(e, category._id, "short")
              }
            />
            <input
              className="edit-category"
              type="text"
              value={this.state[`${category._id}-color`] || category.color}
              name="color"
              onChange={e =>
                this.handleEditCategoryChange(e, category._id, "color")
              }
            />
						<FiX onClick={() => this.handleDelete(category._id)} />
            <input type="submit" />
          </form>
        ))}

        <h3>Add a new Category:</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="categoryName">Name:</label>
          <input
            type="text"
            name="categoryName"
            value={categoryName}
            onChange={this.handleNewCategoryChange}
            id="categoryName"
          />
          <label htmlFor="categoryShort">Short:</label>
          <input
            type="text"
            name="categoryShort"
            value={categoryShort}
            onChange={this.handleNewCategoryChange}
            id="categoryShort"
          />
          <label htmlFor="categoryColor">Color:</label>
          <input
            type="text"
            name="categoryColor"
            value={categoryColor}
            onChange={this.handleNewCategoryChange}
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
    categories: state.boardsById[boardId].settings.categories,
    defaultCategory: state.boardsById[boardId].settings.defaultCategory
  };
};

export default withRouter(connect(mapStateToProps)(Categories));
