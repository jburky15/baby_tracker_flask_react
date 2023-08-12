import { userEffect, useState } from 'react';
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
        <form>
          <label htmlFor="description">Description</label>
          <input onChange={ handleChange } type="text" name="description" id="description" value={ description } />
        </form>
      </div>
    </>
  )
}

export default InputForm;