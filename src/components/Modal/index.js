import { useState } from 'react';
import './modal.css';

const Modal = ({ onSetModalIsOn, onSetContacts }) => {

  const [userInput, setUserInput] = useState({ name: '', phoneNumber: '' });
  const createNewContact = (e) => {
    const { value, name } = e.target
    setUserInput((userInput) => ({ id: Date.now(), ...userInput, [name]: value }));
  }

  const addNewContactToList = () => {
    onSetContacts((previousContacts) => {
      previousContacts.push(userInput);
      localStorage.setItem("contacts", JSON.stringify(previousContacts));
      return previousContacts;
    })
    onSetModalIsOn(false);
  }

  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => onSetModalIsOn(false)}>&times;</span>
        <h2 style={{ textAlign: "center" }}>Add new Contact</h2>
        <div className='userInputWrapper'>
          <input type='text' name='name' placeholder='Name' onInput={createNewContact} />
        </div>
        <div className='userInputWrapper'>
          <input type='text' name="phoneNumber" placeholder='Phone number' onInput={createNewContact} />
        </div>
        <div className='userInputWrapper'><button onClick={addNewContactToList}>Add</button></div>
      </div>
    </div>
  )
}

export default Modal;