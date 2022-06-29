import React from 'react'

const CheckboxFormGroup = ({labelText, value, name, handleChange}) => {

  const toggle = value ? 'ON' : 'OFF';
  const toggleColor = value ? 'bg-success' : 'bg-danger';

  return (
    <li className="list-group-item">
      <div className="form-check form-switch d-flex">
          <input
            className="form-check-input"
            role="switch"
            type="checkbox"
            value={value}
            name={name}
            id={name}
            onChange={handleChange}
          />
          <label className="checkbox-label ms-3" htmlFor={name}>{labelText}</label>
          <span className={`badge ${toggleColor} rounded-pill ms-auto`}>{toggle}</span>
      </div>
    </li>
  )
}

export default CheckboxFormGroup