import React from 'react'
import './index.css';

const Input = ({...rest}) =>
{
    return <input className="input" {...rest} />
}

export default Input