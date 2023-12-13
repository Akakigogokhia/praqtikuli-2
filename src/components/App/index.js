import { useState } from 'react';
import ContactList from '../ContactList';
import Modal from '../Modal';
import './index.css';
import EditModal from '../EditModal';

const App = () => {
  const [modalIsOn, setModalIsOn] = useState(false);
  const [editedId, setEditedId] = useState('');
  const contactsDefaultState = localStorage.getItem('contacts')
    ? JSON.parse(localStorage.getItem('contacts'))
    : [];
  const [contacts, setContacts] = useState(contactsDefaultState);
  return (
    <>
      <button onClick={() => setModalIsOn(true)} id='add-new-contact'>
        Add Contact
      </button>
      <ContactList
        contacts={contacts}
        onSetContacts={setContacts}
        onSetEditModalIsOn={setEditedId}
      />
      {modalIsOn && (
        <Modal onSetModalIsOn={setModalIsOn} onSetContacts={setContacts} />
      )}
      {editedId && (
        <EditModal
          contacts={contacts}
          editedId={editedId}
          onSetModalIsOn={setEditedId}
          onSetContacts={setContacts}
        />
      )}
    </>
  );
};

export default App;
