
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ClientHome from './routes/ClientHome';
import ProductsDetails from './routes/ClientHome/ProductsDetails';
import Catalog from './routes/ClientHome/Catalog';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClientHome />}>
          <Route index element={<Catalog />}></Route>
          <Route path="catalog" element={<Catalog />}></Route>
          <Route path="products-details/:productId" element={<ProductsDetails />}></Route>
        </Route>
      </Routes>

    </BrowserRouter>
  )
}


