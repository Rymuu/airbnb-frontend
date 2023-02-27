import React from 'react';

const Index = (props) => {
  return (
    <div className={props.divClass}>
      <label className='text-2xl mt-4 font-medium'>{props.titleLabel}</label>
      <p className='hidden md:block text-gray-500 text-sm'>{props.description}</p>
      <input
        className={props.inputClass}
        type={props.inputType}
        placeholder={props.inputPlaceholder}
        name={props.inputName}
        value={props.inputValue}
        onChange={props.inputOnChange}
        required={props.inputRequired}
      />
    </div>
  );
}

export default Index;