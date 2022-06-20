import { useState } from 'react';
import '../Styles/CreateProduct.scss';

export default function CreateProduct() {
    const [inputs, setInputs] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(inputs);
        if (inputs.name && inputs.name.length < 3){
            alert('Name the game!');
        } else if (inputs.img && inputs.img.length < 3){
            alert('Add a cover picture!');
        } else if (inputs.currency === 'select'){
            alert('Select a currency!');
        } else if (inputs.category === 'select'){
            alert('Select a category!');
        } else {
            console.log('You made it!');
        }
    };

    return(
        <>
            <form id="create_form">
                <table>
                    <tbody>
                        <tr>
                            <th><label>Name: </label></th>
                            <td><input type="text" name="name" id="input" onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <th><label>Picture: </label></th>
                            <td><input type="text" name="img" id="input" onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <th><label>Price: </label></th>
                            <td>
                            <select name="currency" id="currency" onChange={handleChange}>
                                <option value="select">Select a currency</option>
                                <option value="Sek">Sek</option>
                                <option value="euro">Euro</option>
                                <option value="dollar">Dollar</option>
                            </select>
                            </td>
                        </tr>
                        <tr>
                            <th><label>Category: </label></th>
                            <td>
                            <select name="category" id="category" onChange={handleChange}>
                                <option value="select">Select a category</option>
                                <option value="action">Action</option>
                                <option value="adventure">Adventure</option>
                                <option value="puzzle">Puzzle</option>
                                <option value="racing">Racing</option>
                                <option value="simulation">Simulation</option>
                                <option value="party">Party</option>
                            </select>
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