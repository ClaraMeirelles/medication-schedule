
import './App.css'
import { Form } from './components/Form/Form'
import { MedicationsTable } from './components/MedicationsTable/MedicationsTable'

function App() {

  return (

    <div className="App">
      <h1>Lista de Medicamentos e posologia</h1>
      <Form />
      <MedicationsTable />
    </div>

  )
}

export default App
