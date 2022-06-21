import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import ListProduct from './components/ListProduct';
import CreateProduct from './components/CreateProduct';
import EditProduct from './components/EditProduct';
import DeleteProduct from './components/DeleteProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">List Products</Link>
            </li>
            <li>
              <Link to="product/create">Create Product</Link>
            </li>
            <li>
              <Link to="product/delete">Delete Product</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<ListProduct />} />
          <Route path="product/create" element={<CreateProduct />} />
          <Route path="product/delete" element={<DeleteProduct />} />
          <Route path="product/:id/edit" element={<EditProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
