import { useState, useEffect } from 'react';
import 'boxicons'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ContactList from './Component/ContactList';

function App() {
  const [showForm, setShowForm] = useState(false)
  const [contact, setContact] = useState({
    name: '',
    number: ''
  })
  const [contacts, setContacts] = useState(localStorage.getItem('contacts') == null ? [] : JSON.parse(localStorage.getItem('contacts')))

  function handleChange(ev) {
    setContact(prevContact => {
      return {
        ...prevContact,
        [ev.target.name]: ev.target.value
      }
    })
  }

  function addContact() {
    setContacts(prevContacts => {
      return [
        ...prevContacts, contact
      ]
    })
  }

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  

  return (
    <Container fluid className="w-100 d-flex align-items-center justify-content-center flex-column">
      <h1 className='display-6 my-5 text-center'>Contacts List</h1>
      <Button onClick={() => setShowForm(!showForm)} className='border-purple add-btn mb-5 d-flex align-items-center justify-content-center'>
        <span className='me-2'>Add Contact</span>
        {
          showForm ?
            <box-icon type="solid" size="22px" color="purple" name="chevron-down"></box-icon>
            :
            <box-icon name="chevron-up" type="solid" size="22px" color="purple"></box-icon>
        }
      </Button>
      {
        showForm ? <Form className='mb-4'>
          <Container className='d-flex align-items-center'>
            <Form.Group className="mb-3 me-2">
              <Form.Control type="text" placeholder="Name" className='text-dark input' name='name' value={contact.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3 ms-2">
              <Form.Control type="tel" placeholder="Phone Number" className='text-dark input' name='number' value={contact.number} onChange={handleChange} />
            </Form.Group>
          </Container>
          <div className="d-flex justify-content-center align-items-center mt-3">
            <Button className='btn-purple border-0 px-5' onClick={addContact}>Add</Button>
          </div>
        </Form> : ''
      }
      <ContactList contacts={contacts}/>
    </Container>
  )
}

export default App
