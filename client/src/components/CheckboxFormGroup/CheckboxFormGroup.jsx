import React from 'react'

const CheckboxFormGroup = ({labelText, value, name, handleChange}) => {
  return (
    <div className="form-check form-switch m-2">
        <input
          className="form-check-input"
          role="switch"
          type="checkbox"
          value={value}
          name={name}
          id={name}
          onChange={handleChange}
        />
        <label htmlFor={name}>{labelText}</label>
    </div>
  )
}

export default CheckboxFormGroup