import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import { Col, Row } from 'react-bootstrap';

class Library extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

      categories: [],
      bookCategory: [],
      selectedCategory: null
    };
  }

  componentDidMount() {
    var obj = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': ''
      }
    };

    fetch("http://localhost:8080/library-app/listAllCategories", obj)
      .then(res => res.json())
      .then(
        (result) => {

          console.log("The response :: ", result);
          this.setState({
            categories: result
          });
          console.log("Printing the State ", this.state);
        },
        (error) => {
          console.log('Printing the error ', error);
        }
      )
  }


  getCategoryById = (id) => {

    var obj = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': ''
      }
    };

    fetch("http://localhost:8080/library-app/listByCategory?categoryId=" + id, obj)
      .then(res => res.json())
      .then(
        (result) => {

          console.log("The response :: ", result);
          this.setState({
            bookCategory: result
          });
          console.log("Printing the State ", this.state);
        },
        (error) => {
          console.log('Printing the error ', error);
        }
      )
  }

  render() {
    if (this.state.categories && this.state.categories.length != 0) {
      return (
        <div>

          {this.state.categories.length != 0 ?
            <div>
              <Row>
                <Col xs={6}>
                  <h1>Categories</h1>
                  <Table bordered hover style={{ cursor: "pointer" }}>
                    <tbody>

                      {this.state.categories.map((row, index) => {
                        return (
                          <tr href="#" key={row.id} onClick={() => this.getCategoryById(row.id)}>
                            <td>{row.categoryName}</td>
                          </tr>
                        );
                      })}
                    </tbody>

                  </Table>
                </Col>
                <Col xs={6}>

                  {this.state.bookCategory.length != 0 ?
                    <div>
                      <h1>Book List</h1>
                      <Table bordered striped>
                        <thead>
                          <th>Book</th>
                          <th>Author</th>
                        </thead>
                        <tbody>
                          {this.state.bookCategory.map((book, index) => {
                            return (
                              <tr>
                                <td>{book.book_name}</td>
                                <td>{book.author_name}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </div> : "Books will be shown here.."}
                </Col></Row></div> : "Loading the Data"

          }

        </div>
      );
    } else {
      return (<div>No Books in the Library</div>);
    }


  }
}

export default Library;