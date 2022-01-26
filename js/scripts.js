// Business Logic for AddressBook
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function(){
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

AddressBook.prototype.update = function(id, firstName, lastName, phoneNumber, emailAddress, physicalAddress) {
  if (this.contacts[id] === undefined) {
    return false
  } else {
    this.contacts[id].firstName = firstName;
    this.contacts[id].lastName = lastName;
    this.contacts[id].phoneNumber = phoneNumber;
    this.contacts[id].emailAddress = emailAddress;
    this.contacts[id].physicalAddress = physicalAddress;
  }
   
};

// Business Logic for Contacts

function Contact(firstName, lastName, phoneNumber, emailAddress, physicalAddress) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.emailAddress = emailAddress;
  this.physicalAddress = physicalAddress;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

//TODO: Add multiple fields for address
// function Ph {
  
// };

// Form 
// name blah blah
// Address:
// street
// etc

// let street = $("#street")
// blah blah

// function physicalAddress(street, aptNumber, city, state, zip) {
//   this.street = street;
//   this.aptNumber = aptNumber;
//   this.city = city;
//   this.state = state;
//   this.zip = zip;
// }

// let physicalAddress = { 
//   street
//   aptNumber
//   city
//   state
//   zip
// };


// User Interface Logic
let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  let contactList = $("ul#contacts");
  let htmlForContactInfo ="";
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactList.html(htmlForContactInfo);
}

function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email-address").html(contact.emailAddress);
  $(".physical-address").html(contact.physicalAddress);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + contact.id +  ">Delete</button>");
}

function attachContactListeners () {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  }); 
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
}

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedEmailAddress = $("input#new-email-address").val();
    const inputtedPhysicalAddress = $("input#new-physical-address").val();

    // Clears out input fields
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email-address").val("");
    $("input#new-physical-address").val("");

    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmailAddress, inputtedPhysicalAddress);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});

// let contact = new Contact("Ada", "Lovelace", "503-555-0100");
// let contact2 = new Contact("Grace", "Hopper", "503-555-0199");
// addressBook.addContact(contact);
// addressBook.addContact(contact2);
