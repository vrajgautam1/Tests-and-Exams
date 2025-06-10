import React, { useEffect, useState } from "react";
import "../assets/script";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Table({
    product,
    setProduct,
    productList,
    setProductList,
    editableProduct,
    setEditableProduct,
}) {
    let url = "http://localhost:3000/products";
    let navigate = useNavigate();

    //searching functionality.. 
    const  [search, setSearch] = useState("")

    useEffect(() => {
        async function fetchdata() {
            try {
                let res = await axios.get(url);
                setProductList(res.data);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchdata();
    }, []);

    async function handleDelete(id) {
        try {
            await axios.delete(url + `/${id}`); //this is for when someone visits the page
            let updatedPrList = productList.filter((p, i) => {
                return p.id !== id;
            });

            setProductList(updatedPrList); //we update the state to re render the page. so that deletions can be seen in real time instead of reloading
        } catch (error) {
            console.log(error.message);
        }
    }

    function handleEdit(id) {
        let productToEdit = productList.find((p) => p.id === id);
        setEditableProduct(productToEdit);
        navigate("/form");
    }

    function handleSearch(e){
        const {value} = e.target
        setSearch(value)
    }

    useEffect(()=>{
        const filteredList = productList.filter((product)=>{
            return(
                product.productname.toLowerCase().includes(search.toLowerCase())
            )
        })

        setProductList(filteredList)
    }, [search])

    

    return (
        <div className="container">
            <div className="page-inner">
                <div className="page-header">
                    <h3 className="fw-bold mb-3">DataTables.Net</h3>
                    <ul className="breadcrumbs mb-3">
                        <li className="nav-home">
                            <a href="#">
                                <i className="icon-home" />
                            </a>
                        </li>
                        <li className="separator">
                            <i className="icon-arrow-right" />
                        </li>
                        <li className="nav-item">
                            <a href="#">Tables</a>
                        </li>
                        <li className="separator">
                            <i className="icon-arrow-right" />
                        </li>
                        <li className="nav-item">
                            <a href="#">Datatables</a>
                        </li>
                    </ul>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex align-items-center justify-content-between">
                                    <h4 className="card-title">
                                        Product List
                                    </h4>
                                    <input
                                        type="text"
                                        placeholder="Search by product name..."
                                        className="px-4 py-2 w-full max-w-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm rounded-pill ms-2"
                                        onChange={handleSearch}
                                    />
                                </div>

                            </div>
                            <div className="card-body">
                                {/* Modal */}
                                <div
                                    className="modal fade"
                                    id="addRowModal"
                                    tabIndex={-1}
                                    role="dialog"
                                    aria-hidden="true"
                                >
                                    <div
                                        className="modal-dialog"
                                        role="document"
                                    >
                                        <div className="modal-content">
                                            <div className="modal-header border-0">
                                                <h5 className="modal-title">
                                                    <span className="fw-mediumbold">
                                                        New
                                                    </span>
                                                    <span className="fw-light">
                                                        Row
                                                    </span>
                                                </h5>
                                                <button
                                                    type="button"
                                                    className="close"
                                                >
                                                    <span aria-hidden="true">
                                                        ×
                                                    </span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <p className="small">
                                                    Create a new row using this
                                                    form, make sure you fill
                                                    them all
                                                </p>
                                                <form>
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <div className="form-group form-group-default">
                                                                <label>
                                                                    Name
                                                                </label>
                                                                <input
                                                                    id="addName"
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="fill name"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 pe-0">
                                                            <div className="form-group form-group-default">
                                                                <label>
                                                                    Position
                                                                </label>
                                                                <input
                                                                    id="addPosition"
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="fill position"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group form-group-default">
                                                                <label>
                                                                    Office
                                                                </label>
                                                                <input
                                                                    id="addOffice"
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="fill office"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="modal-footer border-0">
                                                <button
                                                    type="button"
                                                    id="addRowButton"
                                                    className="btn btn-primary"
                                                >
                                                    Add
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    data-dismiss="modal"
                                                >
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table
                                        id="add-row"
                                        className="display table table-striped table-hover"
                                    >
                                        <thead>
                                            <tr>
                                                <th>SKU</th>
                                                <th>Name</th>
                                                <th>Image</th>
                                                <th>Brand</th>
                                                <th>Description</th>
                                                <th>Category</th>
                                                <th>Rating</th>
                                                <th>Availability</th>
                                                <th style={{ width: "10%" }}>
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {productList &&
                                            productList.length > 0
                                                ? productList.map(
                                                      (t, index) => {
                                                          return (
                                                              <tr key={index}>
                                                                  <td>
                                                                      {t.sku}
                                                                  </td>
                                                                  <td>
                                                                      {
                                                                          t.productname
                                                                      }
                                                                  </td>
                                                                  <td>
                                                                      <img
                                                                          src={
                                                                              t
                                                                                  .image
                                                                                  ?.url
                                                                          }
                                                                          alt="Product"
                                                                          className="w-50"
                                                                      />
                                                                  </td>
                                                                  <td>
                                                                      {t.brand}
                                                                  </td>
                                                                  <td>
                                                                      {
                                                                          t.description
                                                                      }
                                                                  </td>
                                                                  <td>
                                                                      {
                                                                          t.category
                                                                      }
                                                                  </td>
                                                                  <td>
                                                                      {t.rating}
                                                                  </td>
                                                                  <td>
                                                                      {t.stock}
                                                                  </td>
                                                                  <td>
                                                                      <div className="form-button-action">
                                                                          <button
                                                                              type="button"
                                                                              className="btn btn-link btn-primary btn-lg"
                                                                              title="Edit Task"
                                                                              onClick={() =>
                                                                                  handleEdit(
                                                                                      t.id
                                                                                  )
                                                                              }
                                                                          >
                                                                              <i className="fa fa-edit" />
                                                                          </button>

                                                                          <button
                                                                              type="button"
                                                                              className="btn btn-link btn-danger"
                                                                              title="Remove"
                                                                              onClick={() =>
                                                                                  handleDelete(
                                                                                      t.id
                                                                                  )
                                                                              }
                                                                          >
                                                                              <i className="fa fa-times" />
                                                                          </button>
                                                                      </div>
                                                                  </td>
                                                              </tr>
                                                          );
                                                      }
                                                  )
                                                : null}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Table;
