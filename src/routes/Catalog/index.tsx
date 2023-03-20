import './styles.css';
import HeaderClient from '../../components/HeaderClient';
import computerImg from '../../assets/computer.png';
import SearchBar from '../../components/SearchBar';
import CatalogCard from '../../components/CatalogCard';
import BtnNextPage from '../../components/BtnNextPage';

export default function Catalog() {
    return (
        <>
            <HeaderClient />

            <main>
                <section id="catalog-section" className="dsc-container">
                    <SearchBar />
                    <div className="dsc-catalog-cards dsc-mb20 dsc-mt20 ">
                        <CatalogCard />
                        <CatalogCard />
                        <CatalogCard />
                        <CatalogCard />
                        <CatalogCard />
                        <CatalogCard />
                        <CatalogCard />
                        <CatalogCard />
                        <CatalogCard />
                        <CatalogCard />
                        <CatalogCard />
                    </div>
                    <BtnNextPage />
                </section>
            </main>
        </>
    )
}