import React, { useState } from "react";
import { Routes, Route, Form } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Table from "./pages/Table";
import ProductForm from "./pages/ProductForm";
import AdminLayout from "./Layouts/AdminLayout";
import ClientLayout from "./Layouts/ClientLayout";
import Homepage from "./pages/Homepage";
import Aboutus from "./pages/Aboutus";

function App() {
    const [product, setProduct] = useState({});
    const [productList, setProductList] = useState([]);
    const [editableProduct, setEditableProduct] = useState({})

    return (
        <Routes>

            {/* admin routes  */}
            <Route path="/admin" element={<AdminLayout />}>

                <Route path="dashboard" element={<Dashboard />} />
                <Route
                    path="table"
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
                    path="form"
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
            </Route>


            <Route path="/" element={<ClientLayout />}>
                <Route index element={<Homepage />} />
                <Route path="about" element={<Aboutus/>}/>
            </Route>
        </Routes>

    );
}

export default App;
