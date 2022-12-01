import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Notification from './components/Notification';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (!persons.filter(person => person.name.toLowerCase() === newName.toLowerCase()).length > 0) {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setSuccessMessage(`Added ${returnedPerson.name}`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        });
    } else {
      const updateMessage = `${newName} is already added to the phonebook. Would you like to replace the old number?`;
      if (window.confirm(updateMessage)) {
        const person = persons.find(p => p.name.toLowerCase() === newName.toLowerCase());
        const changedPerson = { ...person, number: newNumber };

        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.name.toLowerCase() !== newName.toLowerCase() ? p : returnedPerson));
          });
      }
    }
    setNewName('');
    setNewNumber('');
  };

  const deletePerson = (id, name) => {
    const deleteMessage = `Delete ${name}?`;
    if (window.confirm(deleteMessage)) {
      personService
        .del(id)
        .then(returnedPerson => {
          setPersons(persons.filter(p => p.id !== id));
        });
    }
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
      <Notification newName={newName} successMessage={successMessage} />
      <Filter value={filterName} onChange={handleFilterNameChange} />
      <h2>Add New</h2>
      <PersonForm onSubmit={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons deletePerson={deletePerson} personsToShow={personsToShow} />
    </div>
  );
};

export default App;
