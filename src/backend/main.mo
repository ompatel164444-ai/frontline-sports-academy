import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Order "mo:core/Order";

actor {
  type ContactMessage = {
    id : Nat;
    name : Text;
    phone : Text;
    message : Text;
  };

  module ContactMessage {
    public func compare(message1 : ContactMessage, message2 : ContactMessage) : Order.Order {
      Nat.compare(message1.id, message2.id);
    };
  };

  let contactMessages = Map.empty<Nat, ContactMessage>();
  var nextContactMessageId = 0;

  public shared ({ caller }) func submitContactMessage(name : Text, phone : Text, message : Text) : async () {
    let contactMessage : ContactMessage = {
      id = nextContactMessageId;
      name;
      phone;
      message;
    };
    contactMessages.add(contactMessage.id, contactMessage);
    nextContactMessageId += 1;
  };

  public query ({ caller }) func getContactMessages() : async [ContactMessage] {
    contactMessages.values().toArray().sort();
  };

  public query ({ caller }) func getContactMessage(contactMessageId : Nat) : async ContactMessage {
    switch (contactMessages.get(contactMessageId)) {
      case (null) { Runtime.trap("Contact message does not exist") };
      case (?contactMessage) { contactMessage };
    };
  };
};
