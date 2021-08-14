import { React, useState, useEffect } from 'react';
import './styles.css';

const URL = 'https://randomuser.me/api/?results=';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [cardsCount, setCardsCount] = useState(3);
  const changeCount = (increase) => {
    if (increase) {
      setCardsCount(cardsCount + 1);
      return
    }
    if (cardsCount === 0) return;
    setCardsCount(cardsCount - 1);
  };
  const getContacts = () => {
    return fetch(URL + cardsCount)
    .then(response => response.json())
    .then(data => {
        setContacts(data.results);
    });
  };
  useEffect(() => {
    getContacts();
  }, [cardsCount]);
  return (
    <>
      {/* <button onClick={getContacts}>Update cards</button> */}
      <div>
        <button onClick={() => changeCount(true)}>Add</button>
          <span>{cardsCount}</span>
        <button onClick={() => changeCount(false)}>Remove</button>
      </div>
      {contacts.map(contact => (
        <ContactCard
          key = {contact.login.uuid}
          avatar = {contact.picture.large}
          name = {contact.name.first + ' ' + contact.name.last}
          email = {contact.email}
          age = {contact.dob.age}
        />
      ))}
    </>
  );
};

const ContactCard = (props) => {
  const [showAge, setShowAge] = useState(true);
  return (
    <div className="contact-card">
      <img src={props.avatar} alt="user" />
      <div className="user-details">
        <p>Name: {props.name}</p>
        <p>Email: {props.email}</p>
        <button onClick={() => setShowAge(!showAge)}>
          Toggle age
        </button>
        {showAge && <p>Age: {props.age}</p>}
      </div>
    </div>
  );
};

export default App;