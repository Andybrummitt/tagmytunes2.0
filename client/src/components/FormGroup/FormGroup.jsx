import React from 'react'

const FormGroup = ({type, labelText, value, name, handleChange}) => {
  return (
    <div className="form-check form-switch">
        <label htmlFor={name}>{labelText}</label>
        <input
          type={type}
          value={value}
          name={name}
          id={name}
          onChange={handleChange}
        />
    </div>
  )
}

export default FormGroup