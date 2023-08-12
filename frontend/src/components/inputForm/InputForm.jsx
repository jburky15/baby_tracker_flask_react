import { useEffect, useState } from 'react';
import React from 'react'
import './InputForm.css'


const InputForm = () => {
  const [description, setDescription] = useState("");

  const handleChange = e => {
    setDescription(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log(description);
  }

  return (
    <>
      <div className='eventInput'>
        <form onSubmit={ handleSubmit }>
          <label htmlFor="description">What the baby do?</label>
          <input onChange={ handleChange } type="text" name="description" id="descriptionInput" value={ description } placeholder='Baby Event' />
          <input type="submit" value="SUBMIT" className='submitBtn' />
        </form>
      </div>
    </>
  )
}

export default InputForm;