import Person from "./Person";

const Persons = ({ deletePerson, personsToShow }) => {
  return (
    <>
      {personsToShow.map(person =>
        <Person key={person.name} person={person} deletePerson={() => deletePerson(person.id, person.name)} />
      )}
    </>
  );
};

export default Persons;
