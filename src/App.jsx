import { useState, useEffect, createContext, useRef } from 'react';
import 'boxicons';
import { nanoid } from 'nanoid';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import ContactList from './Component/ContactList';

export const LevelContext = createContext([])

function App() {
  const [showForm, setShowForm] = useState(false)
  const [contactInfo, setContactInfo] = useState({
    name: '',
    number: '',
    id: '',
    createdAt: ''
  })
  const [contacts, setContacts] = useState(localStorage.getItem('contacts') == null ? [] : JSON.parse(localStorage.getItem('contacts')));
  const [darkMode, setDarkMode] = useState(false);
  const [showUpdateBtn, setShowUpdateBtn] = useState(false)
  const formRef = useRef(null);

  console.log(formRef)

  const sortedContacts = contacts.sort((a, b) => {
    const hasUpdatedAt = contacts.some((cd) => cd.hasOwnProperty("updatedAt"));

    if (hasUpdatedAt) {
      return b.updatedAt - b.createdAt
    } else {
      return b.createdAt - a.createdAt
    }
  });

  function handleChange(ev) {
    setContactInfo(prevContact => {
      return {
        ...prevContact,
        [ev.target.name]: ev.target.value
      }
    });
  }

  function addContact(ev) {

    ev.preventDefault();

    contactInfo.id = nanoid();
    contactInfo.createdAt = new Date();

    if (contactInfo.name === "" || contactInfo.number === "") {
      return;
    } else {
      setContacts(prevContacts => {
        return [
          ...prevContacts, contactInfo
        ]
      });

    }

    formRef.current.reset();
  }

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  function handleDelete(ev, elId) {
    setContacts((current) =>
      current.filter((contact) => contact.id !== elId)
    );
  };

  function getContact(ev, contactId) {
    const ele = contacts.find((el) => el.id === contactId);
    setShowForm(true)

    setContactInfo(prev => {
      return {
        ...prev,
        name: ele.name,
        number: ele.number,
        id: ele.id,
        updatedAt: ""
      }
    })
    setShowUpdateBtn(true)
  }

  function updateContact(ev) {
    ev.preventDefault();
    const updateDate = new Date();

    const updatedContact = contacts.map((obj) => {
      if (obj.id === contactInfo.id) {
        return { ...obj, name: contactInfo.name, number: contactInfo.number, updatedAt: updateDate };
      }

      return obj;
    });

    setContacts(updatedContact);

    formRef.current.reset();
  }

  return (
    <main className={`container-fluid ${darkMode ? "dark" : ""} w-100`} style={{ height: "100vh" }}>
      <div className='d-flex align-items-center justify-content-end p-3'>
        <span className='mx-2 text-muted'>Light</span>
        <span className='pointer' onClick={() => setDarkMode(prev => !prev)}>
          {
            darkMode ? <box-icon name='toggle-right' color="white" size="50px" ></box-icon> : <box-icon name='toggle-left' size="50px" ></box-icon>
          }
        </span>
        <span className='me-2 text-muted'>Dark</span>
      </div>

      <Container fluid className="w-100 d-flex align-items-center justify-content-center flex-column">
        <h1 className='display-6 mb-5 text-center'>Contacts List</h1>
        <Button onClick={() => setShowForm(prev => !prev)} className='border-purple add-btn mb-5 d-flex align-items-center justify-content-center'>
          <span className='me-2'>Add Contact</span>
          {
            showForm ?
              <box-icon type="solid" size="22px" color="purple" name="chevron-down"></box-icon>
              :
              <box-icon name="chevron-up" type="solid" size="22px" color="purple"></box-icon>
          }
        </Button>
        {
          showForm ?
            <form className='mb-4' ref={formRef} onSubmit={showUpdateBtn ? updateContact : addContact}>
              <div className='d-flex align-items-center'>
                <div className="mb-3 me-2">
                  <input type="text" placeholder="Name" className='text-dark input form-control' name='name' value={contactInfo.name} onChange={handleChange} />
                </div>
                <div className="mb-3 ms-2">
                  <input type="tel" placeholder="Phone Number" className='text-dark input form-control' name='number' value={contactInfo.number} onChange={handleChange} />
                </div>
                <input type="text" name='id' value={contactInfo.id} hidden readOnly />
              </div>
              <div className="d-flex justify-content-center align-items-center mt-3">
                {showUpdateBtn ?
                  <button className='btn btn-purple border-0 px-5'>Update</button>
                  :
                  <button className='btn btn-purple border-0 px-5'>Add</button>
                }
              </div>
            </form> : ''
        }
        <LevelContext.Provider value={[sortedContacts, handleDelete, getContact]}>
          <ContactList />
        </LevelContext.Provider>
      </Container>

    </main>
  )
}

export default App
