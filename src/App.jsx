import React, { useState } from "react";
import { Routes, Route, Form } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Table from "./pages/Table";
import ProductForm from "./pages/ProductForm";

function App() {
    const [product, setProduct] = useState({});
    const [productList, setProductList] = useState([]);
    const [editableProduct, setEditableProduct] = useState({})
    
    return (
        <div>
            <div className="wrapper">
                {/* Sidebar */}
                <Sidebar />
                {/* End Sidebar */}
                <div className="main-panel">
                    <Header />

                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route
                            path="/table"
                            element={
                                <Table
                                    product={product}
                                    setProduct={setProduct}
                                    productList={productList}
                                    setProductList={setProductList}
                                    editableProduct={editableProduct}
                                    setEditableProduct={setEditableProduct}
                                />
                            }
                        />
                        <Route
                            path="/form"
                            element={
                                <ProductForm
                                    product={product}
                                    setProduct={setProduct}
                                    productList={productList}
                                    setProductList={setProductList}
                                    editableProduct={editableProduct}
                                    setEditableProduct={setEditableProduct}
                                />
                            }
                        />
                    </Routes>

                    <Footer />
                </div>
                {/* Custom template | don't include it in your project! */}
                {/* End Custom template */}
            </div>
        </div>
    );
}

export default App;
