
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ClientHome from './routes/ClientHome';
import ProductsDetalis from './routes/ClientHome/ProductsDetalis';
import Catalog from './routes/ClientHome/Catalog';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClientHome />}>
          <Route index element={<Catalog />}></Route>
          <Route path="catalog" element={<Catalog />}></Route>
          <Route path="productsDetalis" element={<ProductsDetalis />}></Route>
        </Route>
      </Routes>

    </BrowserRouter>
  )
}


