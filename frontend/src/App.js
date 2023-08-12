import axios from 'axios';
import { format } from 'date-fns';
import './App.css';
import React, { useEffect, useState } from 'react';

const baseUrl = "http://localhost:5000"

function App() {
  const [description, setDescription] = useState("");
  const [eventsList, setEventsList] = useState([])

  const handleChange = e => {
    setDescription(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(`${ baseUrl }/events`, { description })
    setEventsList([...eventsList, data.data])
    setDescription('')
    } catch(err) {
      console.error(err.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${ baseUrl }/events/${ id }`)
      const updatedList = eventsList.filter(event => event.id !== id)
      setEventsList(updatedList)
    } catch (err) {
      console.log(err.message)
    }
  }

  const fetchEvents = async () => {
    const data = await axios.get(`${ baseUrl }/events`)
    const { events } = data.data
    setEventsList(events)
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  return (
    <div className="App">

      <section id="eventInput">
        <form onSubmit={ handleSubmit }>
          <label htmlFor="description">What the baby do?</label>
          <input onChange={ handleChange } type="text" name="description" id="descriptionInput" value={ description } placeholder='Baby Event' />
          <input type="submit" value="SUBMIT" className='submitBtn' />
        </form>
      </section>

      <section id="eventsList">
        <ul>
          {eventsList.map(event => {
            return (
                <li key={event.id}>
                  {event.description}
                  <button className="delBtn" onClick={() => handleDelete(event.id)}>Delete</button>
                </li>
            )
          })}
        </ul>
      </section>

    </div>
  );
}

export default App;
