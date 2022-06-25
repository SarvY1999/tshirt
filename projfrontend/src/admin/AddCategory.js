import React, {useState} from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';

const AddCategory = () => {

    const [] = useState("initialState");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const {user, token} = isAuthenticated();

    const goBack = () => {
        return <div className='mt-5'>
            <Link className='btn btn-sm btn-dark mb-3 rounded' to="/admin/dashboard">
                Back to Home
            </Link>
        </div>
    }

    const myCategoryFrom = () => {
        return <form>
            <div className='form-group'>
                <p className='lead font-weight-normal pt-3'>Enter the category</p>
                <input type='text' className='form-control my-3 border-dark'
                    autoFocus required placeholder='For Ex. Summer'/>
                    <button className='btn btn-success rounded'>Create Category</button>
            </div>
        </form>
    }

    return(<div>
        <Base title='Create a category here' description='add a new category for Tshirts' className='container bg-success p-4'>
            <div className='row bg-white rounded'>
                <div className='col-md-8 offset-md-2'>
                   {myCategoryFrom()}
                   {goBack()}
                </div> 
            </div>
        </Base>
    </div>)
}

export default AddCategory;