import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
  ]);

  const [newName, setNewName] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    if (!persons.filter(person => person.name.toLowerCase() === newName.toLowerCase()).length > 0) {
      const newPerson = {
        name: newName,
      };
      setPersons(persons.concat(newPerson));
    } else {
      alert(`${newName} is already added to the phonebook!`);
    }
    setNewName('');
  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          Name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          <button type='submit'>Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <div key={person.name}>{person.name}</div>
      )}
    </div>
  );
};

export default App;
