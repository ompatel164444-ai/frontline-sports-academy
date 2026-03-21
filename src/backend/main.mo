import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";



actor {
  // Initialize the user system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Type
  public type UserProfile = {
    name : Text;
    email : Text;
    phone : Text;
  };
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Original Enrollment type — kept unchanged for stable variable compatibility
  type Enrollment = {
    name : Text;
    phone : Text;
    age : Nat;
    email : Text;
    address : Text;
    batchTimeSlot : Text;
    location : Text;
    playstyle : Text;
    planDuration : Text;
    medicalProblem : Bool;
  };

  // Combined type returned to the frontend (merges base record with extra maps)
  public type EnrollmentFull = {
    id : Nat;
    name : Text;
    phone : Text;
    age : Nat;
    email : Text;
    address : Text;
    batchTimeSlot : Text;
    location : Text;
    playstyle : Text;
    planDuration : Text;
    medicalProblem : Bool;
    joiningDate : Text;
    expiryDate : Text;
    feePaid : Bool;
  };

  type ContactMessage = {
    id : Nat;
    name : Text;
    phone : Text;
    message : Text;
  };

  // Original stable map — type unchanged so existing data is preserved
  let enrollments = Map.empty<Nat, Enrollment>();
  var nextEnrollmentId = 0;

  // Separate maps for new fields — backward-compatible with existing stored data
  let feePaidMap = Map.empty<Nat, Bool>();
  let joiningDateMap = Map.empty<Nat, Text>();
  let expiryDateMap = Map.empty<Nat, Text>();

  let contactMessages = Map.empty<Nat, ContactMessage>();
  var nextContactMessageId = 0;

  // Enrollment Functions
  public shared ({ caller }) func submitEnrollment(
    name : Text,
    phone : Text,
    age : Nat,
    email : Text,
    address : Text,
    batchTimeSlot : Text,
    location : Text,
    playstyle : Text,
    planDuration : Text,
    medicalProblem : Bool,
    joiningDate : Text,
    expiryDate : Text,
  ) : async () {
    let id = nextEnrollmentId;
    let enrollment = {
      name;
      phone;
      age;
      email;
      address;
      batchTimeSlot;
      location;
      playstyle;
      planDuration;
      medicalProblem;
    };
    enrollments.add(id, enrollment);
    joiningDateMap.add(id, joiningDate);
    expiryDateMap.add(id, expiryDate);
    feePaidMap.add(id, false);
    nextEnrollmentId += 1;
  };

  public shared ({ caller }) func setFeePaid(enrollmentId : Nat, paid : Bool) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update fee status");
    };
    switch (enrollments.get(enrollmentId)) {
      case (null) { Runtime.trap("Enrollment not found") };
      case (?_) {
        feePaidMap.add(enrollmentId, paid);
      };
    };
  };

  public query ({ caller }) func getEnrollments() : async [EnrollmentFull] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all enrollments");
    };
    // Collect into a temporary map then convert to array to avoid Array.append
    let fullMap = Map.empty<Nat, EnrollmentFull>();
    for ((id, e) in enrollments.entries()) {
      let joiningDate = switch (joiningDateMap.get(id)) { case (?v) v; case null "" };
      let expiryDate = switch (expiryDateMap.get(id)) { case (?v) v; case null "" };
      let feePaid = switch (feePaidMap.get(id)) { case (?v) v; case null false };
      fullMap.add(id, {
        id;
        name = e.name;
        phone = e.phone;
        age = e.age;
        email = e.email;
        address = e.address;
        batchTimeSlot = e.batchTimeSlot;
        location = e.location;
        playstyle = e.playstyle;
        planDuration = e.planDuration;
        medicalProblem = e.medicalProblem;
        joiningDate;
        expiryDate;
        feePaid;
      });
    };
    fullMap.values().toArray()
  };

  // Contact Message Functions
  public shared ({ caller }) func submitContactMessage(name : Text, phone : Text, message : Text) : async () {
    let contactMessage = {
      id = nextContactMessageId;
      name;
      phone;
      message;
    };
    contactMessages.add(contactMessage.id, contactMessage);
    nextContactMessageId += 1;
  };

  public query ({ caller }) func getContactMessages() : async [ContactMessage] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all contact messages");
    };
    contactMessages.values().toArray();
  };

  public query ({ caller }) func getContactMessage(contactMessageId : Nat) : async ContactMessage {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view contact messages");
    };
    switch (contactMessages.get(contactMessageId)) {
      case (null) { Runtime.trap("Contact message does not exist") };
      case (?contactMessage) { contactMessage };
    };
  };
};
