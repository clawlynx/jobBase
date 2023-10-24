import React from "react";

function FormRowSelect({ name, labelText, list, defaultValue, onChange }) {
  return (
    <div className="form-row mb-0">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        defaultValue={defaultValue || ""}
        onChange={onChange}
      >
        {list.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FormRowSelect;
