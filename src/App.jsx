import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import contacts from "./services/contacts";
import Notification from "./components/Notification";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredValue, setFilteredValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)


  useEffect(() => {

    // const nonexistentPerson={
    //   name:"Edger Dijkstra",
    //   number:669933355,
    //   id:111111111111111
    // }
    
    // contacts.getAll().then((initialContacts) => setPersons(initialContacts.concat(nonexistentPerson)));

    contacts.getAll().then((initialContacts) => setPersons(initialContacts));

  }, []);

  const capitalizeWord = (word) => {
    return word
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formSubmit = (event) => {
    event.preventDefault();
    console.log("form submit");
    console.log(persons);
    const duplicatePerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    console.log("duplicate", duplicatePerson);

    if (duplicatePerson) {
      // alert(`${newName} is already added to phonebook`);
      // setNewName("");
      // setNewNumber("");
      
      //Change the functionality so that if a number is added to an already existing user, the new number will replace the old number.
      if(window.confirm(`${duplicatePerson.name} is already added to phone,replace the old number(${duplicatePerson.number}) with new one (${newNumber})`)){
        const id = duplicatePerson.id;
        const updatedContact = { ...duplicatePerson, number: newNumber };
  
        contacts
          .update(id, updatedContact)
          .then((contact) =>{
            const newContacts = persons.map((person) => (person.id !== id ? person : contact))
            setPersons( newContacts)
          })
          .catch((error) => console.error(error));
        setNewName("");
        setNewNumber("");

      } else{
        setNewName("");
        setNewNumber("");
      }

    } else {
      // setPersons([
      //   ...persons,
      //   {
      //     name: capitalizeWord(newName),
      //     number: newNumber,
      //     id: ++persons.length,
      //   },
      // ]);

      const newContact = {
        name: capitalizeWord(newName),
        number: newNumber,
      };

      contacts
        .create(newContact)
        .then((contact) =>{ 
          setPersons([...persons, contact])

          setSuccessMessage(
            `'${newContact.name}' Added as a new contact`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
          
        })
        .catch((error) => console.log(error));



      setNewName("");
      setNewNumber("");
    }
  };

  const inputNameOnChange = (event) => {
    event.preventDefault();

    setNewName(event.target.value);
    // console.log(newName);
  };

  const inputNumberOnChange = (event) => {
    event.preventDefault();
    setNewNumber(event.target.value);
  };

  const inputFilterOnChange = (event) => {
    event.preventDefault();
    setFilteredValue(event.target.value);

    // console.log(">>>>>>", filteredValue);
  };

  let filteredPersons;
  let filtered;

  if (filteredValue) {
    filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(filteredValue.toLowerCase())
    );

    filtered = filteredPersons.map((person) => (
      <li key={person.id}>
        {person.name} {person.number}
      </li>
    ));
  }

  // console.log("***filter****", filteredPersons);

  const deleteContact = (id) => {
    console.log(`delete ${id} contact`);

    const deletedContact = persons.find((person) => person.id === id);

    // alert(`Delete ${deletedContact.name} ?`)

    if (window.confirm(`Delete ${deletedContact.name} ?`)) {
      contacts
        .deleteContactDetails(id)
        .then(() => {
          // console.log(">>>>>>>>>>",responseMessage);
          const updatedContacts = persons.filter((person) => person.id !== id);
          setPersons(updatedContacts);
          setErrorMessage(
            `Deleted the contact ${deletedContact.name} ${deletedContact.number}`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch((error) =>{ 
          console.log(error)
          setErrorMessage(
            `Information of '${deletedContact.name}' has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(n => n.id !== id))
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} successMessage={successMessage}/>
      {/* <div>
        filter shown with{" "}
        <input
          type="text"
          value={filteredValue}
          onChange={inputFilterOnChange}
        />
      </div> */}

      <Filter
        filteredValue={filteredValue}
        inputFilterOnChange={inputFilterOnChange}
      />

      <h1>add a new</h1>

      {/* <form onSubmit={formSubmit}>
          <div>
            name:{" "}
            <input type="text" value={newName} onChange={inputNameOnChange} />
            <div>
              number:{" "}
              <input
                type="tel"
                value={newNumber}
                onChange={inputNumberOnChange}
              />
            </div>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form> */}

      <PersonForm
        formSubmit={formSubmit}
        newName={newName}
        inputNameOnChange={inputNameOnChange}
        newNumber={newNumber}
        inputNumberOnChange={inputNumberOnChange}
      />

      <h2>Numbers</h2>

      {/* <ul>
        {
          !filteredPersons ?
            (persons.map((person) => (
              <li key={person.id}>
                {person.name} {person.number}
              </li>
            )))
            :
            filtered
        }
      </ul> */}

      <Persons
        filteredPersons={filteredPersons}
        persons={persons}
        filtered={filtered}
        deleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
