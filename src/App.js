import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN

const url = 'https://course-api.com/react-tours-project'

function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

   //remove item
  const removeTour = (id) =>{
    const newTour = tours.filter((tour) => tour.id !== id);
    setTours(newTour)
  }

  //fetching the API data
  const fetchToursData = async() =>{
    setLoading(true)

    try{
      const response = await fetch(url);
      const tourData = await response.json();
      setLoading(false)
      setTours(tourData)
    } catch(error){
      setLoading(false)
      console.log(error)
    }
    console.log(tours)
  }

  useEffect(()=>{
    fetchToursData()
  },[])

  if(loading){
    return (
      <main>
        <Loading />
      </main>
    )
  };

  //Refresh the page
  if(tours.length === 0){
    return (
      <main>
        <div className='title'>
          <h2>no tours left</h2>
          <button className='btn' onClick={fetchToursData}>refresh</button>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* if loading is false, it will display tours component */}
      <Tours tours={tours} removeTour={removeTour}/>
    </main>
  )
}

export default App
