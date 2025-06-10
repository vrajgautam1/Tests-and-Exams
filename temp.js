<div className="wrapper">
                {/* Sidebar */}
                <Sidebar />

                {/* End Sidebar */}

                <Header />

                {/* Custom template | don't include it in your project! */}

                <Routes>
                    <Route path="/adminDashBoard" element={<Dashboard />} />
                </Routes>

                <Footer />
                {/* End Custom template */}
            </div>