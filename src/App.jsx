import { useState } from 'react'
import FileManager from './FileManager'
import data from './FileManager/Data'
import Pagination from './Pagination'
function App() {
   
  return (
       <>
       <FileManager data = {data}/>
       <Pagination />
       </>
  )
}

export default App
