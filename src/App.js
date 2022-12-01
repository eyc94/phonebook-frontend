import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '123-456-7890' },
    { name: 'Ada Lovelace', number: '392-345-1200' },
    { name: 'Dan Abramov', number: '083-969-5843' },
    { name: 'Mary Poppendieck', number: '353-221-4869' },
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    if (!persons.filter(person => person.name.toLowerCase() === newName.toLowerCase()).length > 0) {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(newPerson));
    } else {
      alert(`${newName} is already added to the phonebook!`);
    }
    setNewName('');
    setNewNumber('');
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value);
  };

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      Filter shown with <input value={filterName} onChange={handleFilterNameChange} />
      <h2>Add New</h2>
      <form onSubmit={addPerson}>
        <div>Name: <input value={newName} onChange={handleNameChange} /></div>
        <div>Number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div>
          <button type='submit'>Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person => 
        <div key={person.name}>{person.name} {person.number}</div>
      )}
    </div>
  );
};

export default App;
