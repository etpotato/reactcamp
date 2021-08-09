import { React, useState } from 'react';
import './styles.css';


fetch("https://randomuser.me/api/?results=3")
.then(response => response.json())
.then(data => {
  console.log(data);
});

const App = () => {
  const [contacts, setContacts] = useState([]);
  return (
    <>
      {contacts.map(contact => (
        <ContactCard
          avatar = 'https://via.placeholder.com/150'
          name = {contact.name}
          email = {contact.email}
          age = {contact.age}
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