import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductForm({
    product,
    setProduct,
    productList,
    setProductList,
    editableProduct,
    setEditableProduct,
}) {
    const [errorObj, setErrorObj] = useState({});
    let navigate = useNavigate();
    let url = "http://localhost:3000/products";

    function handleChange(e) {
        const { name, value, files, checked, type } = e.target;

        if (name === "image") {
            let file = files[0];
            let reader = new FileReader();
            reader.onloadend = () => {
                let data = {
                    name: file.name,
                    type: file.type,
                    url: reader.result,
                };

                setProduct({ ...product, [name]: data });
            };
            reader.readAsDataURL(file);
            return;
        } else {
            setProduct({ ...product, [name]: value });
        }
    }

    function validator() {
        const errors = {};

        if (!product.productname)
            errors.productname = "product name is necessary";
        if (!product.sku) errors.sku = "sku is necessary";
        if (!product.image) errors.image = "image is necessary";
        if (!product.brand) errors.brand = "brand is necessary";
        if (!product.description)
            errors.description = "description is necessary";
        if (!product.category) errors.category = "category is necessary";
        if (!product.rating) errors.rating = "rating is necessary";
        if (!product.stock) errors.stock = "Stock is necessary";

        setErrorObj(errors);

        return Object.keys(errors).length == 0;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!validator()) {
            return;
        }

        try {
            if (editableProduct && Object.keys(editableProduct).length>0) {
                await axios.put(url + `/${editableProduct.id}`, product);
                console.log("product updated");
                setEditableProduct({})
            } else {
                await axios.post(url, product);
                console.log("product added to database");
                setProduct({});
            }
            navigate("/table");
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        if (editableProduct && Object.keys(editableProduct).length>0) {
            console.log()
            setProduct(editableProduct);
        }
    }, [editableProduct]);


    return (
        <div>
            <div className="container">
                <div className="page-inner">
                    <div className="page-header">
                        <h3 className="fw-bold mb-3">Forms</h3>
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
                                <a href="#">Forms</a>
                            </li>
                            <li className="separator">
                                <i className="icon-arrow-right" />
                            </li>
                            <li className="nav-item">
                                <a href="#">Basic Form</a>
                            </li>
                        </ul>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className="card-title">
                                        Add products
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <form action="" onSubmit={handleSubmit}>
                                            <div className="col-md-10">
                                                {/* 1 - SKU */}
                                                <div className="form-group">
                                                    <label htmlFor="sku">
                                                        SKU
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="sku"
                                                        name="sku"
                                                        placeholder="Enter SKU"
                                                        onChange={handleChange}
                                                        value={
                                                            product.sku || ""
                                                        }
                                                    />
                                                    {(
                                                        <p
                                                            style={{
                                                                color: "red",
                                                            }}
                                                        >
                                                            {errorObj.sku}
                                                        </p>
                                                    ) || null}
                                                </div>

                                                {/* 2 - PRODUCT NAME  */}
                                                <div className="form-group">
                                                    <label htmlFor="productname">
                                                        Product Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="productname"
                                                        name="productname"
                                                        placeholder="Enter Product name"
                                                        onChange={handleChange}
                                                        value={
                                                            product.productname ||
                                                            ""
                                                        }
                                                    />
                                                    {(
                                                        <p
                                                            style={{
                                                                color: "red",
                                                            }}
                                                        >
                                                            {
                                                                errorObj.productname
                                                            }
                                                        </p>
                                                    ) || null}
                                                </div>

                                                {/* 3 - PRODCUT IMAGE  */}
                                                <div className="form-group d-flex flex-column">
                                                    <label htmlFor="exampleFormControlFile1">
                                                        Select Image
                                                    </label>

                                                    <input
                                                        type="file"
                                                        className="form-control-file"
                                                        id="exampleFormControlFile1"
                                                        name="image"
                                                        onChange={handleChange}
                                                    />

                                                    {(
                                                        <p
                                                            style={{
                                                                color: "red",
                                                            }}
                                                        >
                                                            {errorObj.image}
                                                        </p>
                                                    ) || null}
                                                </div>

                                                {/* 4 - BRAND  */}
                                                <div className="form-group">
                                                    <label htmlFor="brand">
                                                        Select Brand
                                                    </label>
                                                    <select
                                                        className="form-select"
                                                        id="brand"
                                                        name="brand"
                                                        onChange={handleChange}
                                                        value={
                                                            product.brand || ""
                                                        }
                                                    >
                                                        <option
                                                            value=""
                                                            disabled
                                                        >
                                                            -- Select Category
                                                            --
                                                        </option>

                                                        <option value="roadster">
                                                            Roadster
                                                        </option>

                                                        <option value="nike">
                                                            Nike
                                                        </option>
                                                        <option value="adidas">
                                                            Adidas
                                                        </option>
                                                    </select>

                                                    {(
                                                        <p
                                                            style={{
                                                                color: "red",
                                                            }}
                                                        >
                                                            {errorObj.brand}
                                                        </p>
                                                    ) || null}
                                                </div>

                                                {/* 5 - DESCRIPTION  */}
                                                <div className="form-group">
                                                    <label htmlFor="description">
                                                        Description
                                                    </label>
                                                    <textarea
                                                        className="form-control"
                                                        id="description"
                                                        rows={5}
                                                        name="description"
                                                        onChange={handleChange}
                                                        value={
                                                            product.description ||
                                                            ""
                                                        }
                                                    />
                                                    {(
                                                        <p
                                                            style={{
                                                                color: "red",
                                                            }}
                                                        >
                                                            {
                                                                errorObj.description
                                                            }
                                                        </p>
                                                    ) || null}
                                                </div>

                                                {/* 6 - CATEGORY  */}
                                                <div className="form-group">
                                                    <label htmlFor="category">
                                                        Select Category
                                                    </label>
                                                    <select
                                                        className="form-select"
                                                        id="category"
                                                        name="category"
                                                        onChange={handleChange}
                                                        value={
                                                            product.category ||
                                                            ""
                                                        }
                                                    >
                                                        <option
                                                            value=""
                                                            disabled
                                                        >
                                                            -- Select Category
                                                            --
                                                        </option>
                                                        <option value="tops">
                                                            Tops
                                                        </option>
                                                        <option value="jeans">
                                                            Jeans
                                                        </option>
                                                        <option value="accessories">
                                                            Accessories
                                                        </option>
                                                    </select>
                                                    {(
                                                        <p
                                                            style={{
                                                                color: "red",
                                                            }}
                                                        >
                                                            {errorObj.category}
                                                        </p>
                                                    ) || null}
                                                </div>

                                                {/* 7 - RATING  */}

                                                <div className="form-group">
                                                    <label htmlFor="rating">
                                                        Rating
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="rating"
                                                        name="rating"
                                                        placeholder="Enter Rating"
                                                        onChange={handleChange}
                                                        min="1"
                                                        max="5"
                                                        value={
                                                            product.rating || ""
                                                        }
                                                    />
                                                    {(
                                                        <p
                                                            style={{
                                                                color: "red",
                                                            }}
                                                        >
                                                            {errorObj.rating}
                                                        </p>
                                                    ) || null}
                                                </div>

                                                {/* 8 - INSTOCK  */}
                                                <div className="form-group">
                                                    <label>Availability</label>
                                                    <br />
                                                    <div className="d-flex">
                                                        <div className="form-check me-3">
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="stock"
                                                                id="instock"
                                                                value="instock"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                checked={
                                                                    product.stock ===
                                                                    "instock"
                                                                }
                                                            />
                                                            <label
                                                                className="form-check-label"
                                                                htmlFor="instock"
                                                            >
                                                                In-Stock
                                                            </label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="stock"
                                                                id="outofstock"
                                                                value="outofstock"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                checked={
                                                                    product.stock ===
                                                                    "outofstock"
                                                                }
                                                            />
                                                            <label
                                                                className="form-check-label"
                                                                htmlFor="outofstock"
                                                            >
                                                                Out of Stock
                                                            </label>
                                                        </div>
                                                    </div>
                                                    {(
                                                        <p
                                                            style={{
                                                                color: "red",
                                                            }}
                                                        >
                                                            {errorObj.stock}
                                                        </p>
                                                    ) || null}
                                                </div>
                                            </div>

                                            <div className="card-action">
                                                <button
                                                    className="btn btn-success"
                                                    type="submit"
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductForm;
