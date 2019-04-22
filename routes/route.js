const express = require('express');
const router = express.Router();

const Contact = require('../models/contact');

// retrieving contacts
router.get('/contacts', (req, res, next) => {
  // logic to get contacts
  Contact.find((err, contacts) => {
    res.json(contacts);
  });
});

// add contact
router.post('/contact', (req, res, next) => {
  // logic to add contact
  let newContact = new Contact({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone: req.body.phone,
  });
  newContact.save((err, contact) => {
    if (err) res.json({ msg: 'Failed to add contact' });
    // res.json({ msg: 'Contact added Successfully' });
    res.json(contact);
  });
});

// update contact
router.put('/contact/:id', (req, res, next) => {
  // logic to update contact
  Contact.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }, (err, result) => {
    if(err) res.json(err);
    res.json(result);
  });
});

// delete contact
router.delete('/contact/:id', (req, res, next) => {
  // logic to delete contact
  Contact.remove({ _id: req.params.id }, (err, result) => {
    if(err) res.json(err);
    res.json(result);
  });
});

module.exports = router;