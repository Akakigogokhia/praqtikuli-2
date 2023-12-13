import { useState } from 'react';
import './editModal.css';

const EditModal = ({ contacts, editedId, onSetModalIsOn, onSetContacts }) => {
  const editedContact = contacts.find((contact) => contact.id === editedId);
  const [error, setError] = useState(null);
  const [userInput, setUserInput] = useState({
    name: editedContact.name,
    phoneNumber: editedContact.phoneNumber,
  });
  const editContact = (e) => {
    const { value, name } = e.target;
    let isValid = true;

    if (name === 'phoneNumber' && !/^\d{9}$/.test(value)) {
      isValid = false;
      setError('Invalid phone number');
    }

    if (name === 'name' && value.trim() === '') {
      isValid = false;
      setError('Name cannot be empty.');
    }
    if (isValid) {
      setError(null);
      setUserInput((userInput) => ({
        id: Date.now(),
        ...userInput,
        [name]: value,
      }));
    }
  };

  const saveEditedContact = () => {
    console.log(userInput);
    onSetContacts((previousContacts) => {
      const editedContacts = previousContacts.map((contact) => {
        if (contact.id === editedId) {
          const { name, phoneNumber } = userInput;
          return { ...contact, name, phoneNumber };
        }
        return contact;
      });
      localStorage.setItem('contacts', JSON.stringify(editedContacts));
      return editedContacts;
    });
    onSetModalIsOn('');
  };

  return (
    <div id='myModal' className='modal'>
      <div className='modal-content'>
        <span className='close' onClick={() => onSetModalIsOn('')}>
          &times;
        </span>
        <h2 style={{ textAlign: 'center' }}>Edit Contact</h2>
        <div className='userInputWrapper'>
          <input
            type='text'
            name='name'
            placeholder='Name'
            defaultValue={editedContact.name}
            onInput={editContact}
          />
        </div>
        <div className='userInputWrapper'>
          <input
            type='text'
            name='phoneNumber'
            placeholder='Phone number'
            defaultValue={editedContact.phoneNumber}
            onInput={editContact}
          />
        </div>
        <div className='error'>{error}</div>
        <div className='userInputWrapper'>
          <button disabled={error} onClick={saveEditedContact}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
