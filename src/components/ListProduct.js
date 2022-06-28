import axios from 'axios';
import '../Styles/ListProduct.scss';
import { useEffect, useState, useMemo } from 'react';

// import editIconMoving from '../Styles/icons/icons8-edit.gif';
import editIcon from '../Styles/icons/icons8-edit-64.png';
import deleteIcon from '../Styles/icons/icons8-remove-80.png';

export default function ListProduct() {
    const [products, setProducts] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [filteredResults, setFilteredResults] = useState();
    const categories = useMemo(() => ["Show All"], []);

    const imageOnClick = (name, id) => {
        const answer = window.confirm(`Are you sure you want to remove ${name}?`);
        if(answer){
            axios.delete(`http://localhost/niklas/arbetsprov_nitea/product/${id}/delete`).then(res => {
                window.location.reload(true);
            });
        };
    };

    const searchProduct = (e) => {
        setSearchInput(e.target.value);
    };

    const searchCategory = (e) => {
        setSearchInput(e.target.innerText);
    }

    useEffect(() => {
        axios.get('http://localhost/niklas/arbetsprov_nitea/').then(res => {
            setProducts(res.data);
            // add categories for secondary user-filter
            for(let i = 0; i < res.data.length; i++){
                if (!categories.includes(res.data[i].genre)) {
                    categories.push(res.data[i].genre);
                };
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
            <p id="searchbar">Search: </p><input onChange={(e) => searchProduct(e)}></input>
            {categories.length > 0 && categories.map((category, key) => {
                return (
                    <button id="category-btn" key={key} onClick={(e) => searchCategory(e)}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                )
            })}
            <br />
            {filteredResults && filteredResults.map((product, key) => {
                return (
                <div id='card' key={key}>
                    <h1 id="card_title">{product.name}</h1>
                    <div id="content">
                        <div id='cover'>
                            <img id="game_img" src={product.product_url} alt={product.name} />
                            <p id={`game_${product.release_status === 0 ? "not_released" : "released"}`}></p>
                        </div>
                        <div id="info">
                            <p>{product.price} {product.currency}</p>
                            <p id="genres">{product.genre}</p>
                        </div>
                        <div id="icons">
                            <a href={`product/${product.id}/edit`}>
                                <img id="editIcon" alt="edit" src={editIcon} />
                            </a>
                            <img id="deleteIcon" alt="delete" src={deleteIcon} onClick={ () => imageOnClick(product.name, product.id) } />
                        </div>
                    </div>
                </div>
                )
            })}
        </>
    )
};