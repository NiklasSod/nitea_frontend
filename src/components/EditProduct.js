import { useEffect, useState } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import '../Styles/CreateProduct.scss';

export default function EditProduct() {
    const [inputs, setInputs] = useState({});
    const [preSelectedCategories, setPreSelectedCategories] = useState([]);
    const [currentCurrency, setCurrentCurrency] = useState();

    const navigate = useNavigate(); 
    const {id} = useParams();

    const categoriesObject = [
        'Action', 'Adventure', 'Puzzle', 'Racing', 'Simulation', 'Party', 'Horror'
    ];

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    };

    const handleCategories = (e) => {
        // convert for example string "puzzle" to 3
        let valueToNumber = [];
        for (let i = 0; i < categoriesObject.length; i++) {
            if(e.includes(categoriesObject[i])){
                valueToNumber.push(i + 1);
            }
        }
        let categoryArray = {target: {name: 'category_id', value: valueToNumber}};
        handleChange(categoryArray);
    };

    // temp improve alerts to something better looking
    // temp improve user input control checks
    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputs.product_name && inputs.product_name.length < 3){
            alert('Name the game!');
        } else if (inputs.product_url && inputs.product_url.length < 3){
            alert('Add a cover picture!');
        } else if (inputs.product_price && inputs.product_price === Number){
            alert('Add a price!');
        } else if (inputs.currency_id === 'select'){
            alert('Select a currency!');
        } else if (inputs.category_id === 'select'){
            alert('Select a category!');
        } else {
            let jsonInputs = JSON.stringify(inputs);
            axios.put(`http://localhost/niklas/arbetsprov_nitea/product/${id}/edit`, jsonInputs);
            navigate("/");
            window.location.reload(true);
        };
    };

    useEffect(() => {
        axios.get(`http://localhost/niklas/arbetsprov_nitea/product/${id}/edit`).then(res => {
            setInputs(res.data);
            let genreArray = res.data.genre.split(', ');
            setPreSelectedCategories(genreArray);
            let curr = res.data.currency;
            if(curr === "sek") curr = "1";
            if(curr === "euro") curr = "2";
            if(curr === "dollar") curr = "3";
            setCurrentCurrency(curr);
        });
    }, [id]);

    return(
        <>
            <h1>Edit Product</h1>
            <form id="create_form">
                <table>
                    <tbody>
                        <tr>
                            <th><label>Name: </label></th>
                            <td><input defaultValue={inputs.name} type="text" name="name" id="input" onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <th><label>Picture: </label></th>
                            <td><textarea defaultValue={inputs.product_url} type="text" name="product_url" id="input" onChange={handleChange} 
                                rows={2}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th><label>Price: </label></th>
                            <td>
                            <input defaultValue={inputs.price} type="number" name="price" id="tiny_input" onChange={handleChange} />
                            <select value={currentCurrency} multiple={false} name="currency" id="currency" onChange={handleChange}>
                                <option value="select">Select a currency</option>
                                <option value="1">Sek</option>
                                <option value="2">Euro</option>
                                <option value="3">Dollar</option>
                            </select>
                            </td>
                        </tr>
                        <tr>
                            <th>Categories: </th>
                            <td>
                            <Multiselect
                                options={categoriesObject} id="category_selector"
                                displayValue="value" showArrow style={{width: '30em'}}
                                onSelect={e => handleCategories(e)} name="category_id"
                                onRemove={e => handleCategories(e)} isObject={false}
                                selectedValues={preSelectedCategories}
                            />
                            </td>
                        </tr>
                        <tr>
                            <th>Game released: </th>
                            <td>
                                No <input type="radio" id="released" name="released" value={0} onChange={handleChange} />
                                Yes <input type="radio" id="released" name="released" value={1} onChange={handleChange} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <input type="submit" value="Submit" id="submit" onClick={handleSubmit} />
            </form>
        </>
    )
};