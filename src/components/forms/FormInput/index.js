import React from 'react';
import './styles.scss';
import { Form } from 'react-router-dom';

const FormInput = ({handleChange, label, ...otherProps}) => {

    return(
        <div className='formRow'>
                {label && (
                    <label>
                        {label}
                    </label>
                )}

                <input className='formInput' onChange={handleChange} {...otherProps} />

        </div>
    )
}

export default FormInput;