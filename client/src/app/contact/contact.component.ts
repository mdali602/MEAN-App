import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ContactService } from './contact.service';
import { Contact } from './contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contacts: Contact[] = [];

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this.contactService.getContacts().subscribe((res: Contact[]) => {
      this.contacts = res;
    }, (err) => {
			console.log("TCL: ContactComponent -> getContacts -> err", err);
    });
  }

  addContact(form: NgForm) {
    if(form.invalid) return;
    const contact: Contact = form.value;
    this.contactService.addContact(contact).subscribe((res: Contact) => {
      this.contacts.push(res);
      form.resetForm();
    }, (err) => {
			console.log("TCL: ContactComponent -> addContact -> err", err);
    })
  }

  deleteContact(id) {
    this.contactService.deleteContact(id).subscribe((res) => {
      this.contacts = this.contacts.filter(contact => contact._id !== id);
    }, (err) => {
			console.log("TCL: ContactComponent -> deleteContact -> err", err);
    })
  }
}
