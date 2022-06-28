import { useState } from 'react';
import '../Styles/CreateProduct.scss';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
    const [inputs, setInputs] = useState({});
    let navigate = useNavigate(); 

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    };

    // temp improve
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
            axios.post('http://localhost/niklas/arbetsprov_nitea/', jsonInputs);
            navigate("/");
            window.location.reload(true);
        };
    };

    return(
        <>
            <form id="create_form">
                <table>
                    <tbody>
                        <tr>
                            <th><label>Name: </label></th>
                            <td><input type="text" name="product_name" id="input" onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <th><label>Picture: </label></th>
                            <td><textarea type="text" name="product_url" id="input" onChange={handleChange} 
                                    rows={2}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th><label>Price: </label></th>
                            <td>
                            <input type="number" name="product_price" id="tiny_input" onChange={handleChange} />
                            <select name="currency_id" id="currency" onChange={handleChange}>
                                <option value="select">Select a currency</option>
                                <option value="1">Sek</option>
                                <option value="2">Euro</option>
                                <option value="3">Dollar</option>
                            </select>
                            </td>
                        </tr>
                        <tr>
                            <th><label>Category: </label></th>
                            <td>
                            <select name="category_id" id="category" onChange={handleChange}>
                                <option value="select">Select a category</option>
                                <option value="1">Action</option>
                                <option value="2">Adventure</option>
                                <option value="3">Puzzle</option>
                                <option value="4">Racing</option>
                                <option value="5">Simulation</option>
                                <option value="6">Party</option>
                                <option value="7">Horror</option>
                            </select>
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