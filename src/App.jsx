import { useEffect, useState } from "react";
import base_url from './services/axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './styles.css'
import MainContext from './services/MainContext';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//eslint-disable-next-line
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './components/HomePage';
import DetailedPage from './components/DetailedPage';

function App() {

  const [products, setProducts] = useState([]);
  const [edit, setEdit] = useState(false)
  const [editedProduct, setEditedProduct] = useState(null)

  useEffect(() => {
    base_url.get('/products')
      .then(res => setProducts(res.data))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    let newProduct = {
      id: Date.now(),
      item: e.target[0].value,
      image: e.target[1].files[0].name,
      price: e.target[2].value,
      quantity: e.target[3].value,
      measurement: e.target[4].value,
      category: e.target[5].value
    }

    if (!edit) {
      base_url.post('/products', newProduct)
        .then(res => {
          setProducts([...products, res.data])
          toast(`${res.data.item} added`)
          e.target.reset()
        })
        .catch(err => console.log(err))
    } else {
      base_url.put(`/products/${editedProduct.id}`, { id: editedProduct.id, ...newProduct })
        .then(res => {
          setProducts(products.map(product => {
            if (product.id === res.data.id) {
              product = res.data
            }
            return product;
          }))
          setEdit(false)
          setEditedProduct(null)
        })
        .catch(err => console.log(err))
    }
  }

  const handleDelete = (id) => {
    let confirmation = window.confirm('Are you sure to delete?')
    if (confirmation) {
      base_url.delete(`/products/${id}`)
        .then((res) => {
          console.log(res);
          setProducts(products.filter(product => product.id != id))
        })
        .catch(err => console.log(err))
    }
  }

  const handleEdit = (obj) => {
    setEdit(true)
    setEditedProduct(obj)
  }

  return (
    <MainContext.Provider value={{
      products,
      setProducts,
      handleSubmit,
      handleDelete,
      edit,
      setEdit,
      editedProduct,
      setEditedProduct,
      handleEdit
    }}>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/detail/:id" element={<DetailedPage />} />
        </Routes>
      </Router>
    </MainContext.Provider>
  );
}

export default App;
