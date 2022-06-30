import axios from 'axios';
import '../Styles/ListProduct.scss';
import { useEffect, useState, useMemo } from 'react';
import Card from './Card.js';
import searchIcon from '../Styles/icons/search-icon.png';

export default function ListProduct() {
    const [products, setProducts] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [filteredResults, setFilteredResults] = useState();
    const [search, setSearch] = useState(true);
    const categories = useMemo(() => ["Show All"], []);

    const searchProduct = (e) => {
        setSearchInput(e.target.value);
    };

    const searchCategory = (e) => {
        document.getElementById("searchbarInput").value = '';
        setSearchInput(e.target.innerText);
    }

    const searchByText = () => {
        document.getElementById('searchbarInput').focus();
        setSearch(!search);
    }

    const createGenreArray = (products) => {
        for (let i = 0; i < products.length; i++) {
            let genreArray = products[i].genre.split(', ');
            products[i].genre = genreArray;
        }
        return products;
    }

    useEffect(() => {
        axios.get('http://localhost/niklas/arbetsprov_nitea/').then(res => {
            let p = createGenreArray(res.data);
            setProducts(p);
            // add categories for secondary user-filter
            for(let i = 0; i < p.length; i++){
                for(let j = 0; j < p[i].genre.length; j++){
                    if (!categories.includes(p[i].genre[j])) {
                        categories.push(p[i].genre[j]);
                    };
                }
            };
        });
    }, [categories]);

    // make searchbar and category-serching react directly on change with a secondary useEffect
    useEffect(() => {
        if(searchInput !== ('Show All' || '')){
            const filteredProducts = products.filter((product) => {
                return Object.values([product.name, product.genre]).join('').toLowerCase().includes(searchInput.toLowerCase());
            });
            setFilteredResults(filteredProducts);
        } else {
            setFilteredResults(products)
        };
    }, [searchInput, products]);

    return(
        <>
            <div id="search">
                    <input type="text" id="searchbarInput" style={search ? {display: 'none'} : null} 
                        onMouseOut={() => searchByText()} onChange={(e) => searchProduct(e)}></input>
                    <img id="searchIcon" style={search ? null : {display: 'none'}} 
                        src={searchIcon} alt="search-icon" onClick={() => searchByText()} />
            </div>
            {categories.length > 0 && categories.map((category, key) => {
                return (
                    <button id="category-btn" key={key} onClick={(e) => searchCategory(e)}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                )
            })}
            <br />
            <div id="container">
                <Card products={filteredResults} />
            </div>
        </>
    )
};