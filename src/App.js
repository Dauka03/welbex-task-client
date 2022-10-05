import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import Table from './components/Table';

function App() {
  const [data, setData] = useState([])
  const apiUrl = 'https://welbex-server-task.herokuapp.com/api/inf'
  const getData = () => {      //get from our api data
    axios.get(apiUrl).then((res)=>{ // use axios
      setData(res.data)
    })
  }
  useEffect(()=>{
    getData()  // use this function to get data in useEffect
  },[])
  return (
    <div className="App">
      <div>
      <Table data={data}/> {//give data as props

      }
      </div>
    </div>
  );
}

export default App;
