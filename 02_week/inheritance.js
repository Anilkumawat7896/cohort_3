class UserInformatin {
  constructor(username, password, phoneNumber) {
    this.username = username;
    this.password = password;
    this.phoneNumber = phoneNumber;
  }

  getUsername() {
    return this.username;
  }

  getPassword() {
    return this.password;
  }

  getPhoneNumber() {
    return this.phoneNumber;
  }
}

let user1 = new UserInformatin("anil-connect", "anil@123", "1234567890");
let user2 = new UserInformatin("hizenburg", "hizenburd@123", "1234567890");

// console.log(user1.getUsername());
// console.log(user2.getUsername());

// user2 = user1;

// console.log(user1.getUsername());
// console.log(user2.getUsername());

const user = new Map();
user.set("name", "Anil Kumawat");
user.set("email", "anil@gmail.com");
user.set("passowrd", "Anil@123");
user.set("phoneNumber", "1234567890j");
user.set("Gender", "Male");

console.log(user);
