import Backbone from 'backbone';
import Contact from 'app/models/contact';
import ContactView from 'app/views/contact_view';
import _ from 'underscore';
import $ from 'jquery';

// rolodex_view == contact_list_view ~= task_list_view

const RolodexView = Backbone.View.extend({
  initialize: function(options) {
    // this template is shared between all contacts.
    this.template = _.template($('#tmpl-contact-card').html());

    // Keep track of the <ul> element
    this.listElement = this.$('#contact-cards');

    // Create a ContactView for each contact & store them here
    this.cardList = [];

    this.model.forEach(function(contact) {
            this.addContact(contact);
        }, this); // bind `this` so it's available inside forEach

    this.input = {
      name: this.$('.contact-form input[name="name"]'),
      email: this.$('.contact-form input[name="email"]'),
      phone: this.$('.contact-form input[name="phone"]')
    };

    this.listenTo(this.model, "remove", this.removeContact);
    this.listenTo(this.model, "update", this.render);
    this.listenTo(this.model, "add", this.addContact)
  }, //end of initialize

  render: function(){
    // Make sure the list in the DOM is empty
    // before we start appending items
    this.listElement.empty();

    // Loop through the data assigned to this view
    this.cardList.forEach(function(card) {
      // Cause the task to render
      card.render();
      // Add that HTML to our task list
      this.listElement.append(card.$el);
    }, this);

    return this; // enable chained calls
  }, // end of render

  addContact: function(contact) {
    var card = new ContactView({
      model: contact,
      template: this.template
    });
    this.cardList.push(card);
  }, // end of addContact

  removeTask: function(model) {
    // there is no convenient method to take out one element from an array.
    // this is kinda hacky

    var filteredList = [];
    for (var i = 0; i < this.cardList.length; i++) {
      if (this.cardList[i].model == model) {
        alert('deleted it!')
        console.log('found the bugger!');
      } else {
        // alert("deleted it!")
        filteredList.push(this.cardList[i]);
      }
    }
    this.cardList = filteredList;
  } // end of removeContact


});

export default RolodexView;
