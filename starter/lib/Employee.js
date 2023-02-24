// TODO: Write code to define and export the Employee class

class Employee {
  constructor(name, id, email, role) {
    this.name = name;
    this.id = id;
    this.email = email;
    this.role = getRole();
  }

  printInfo() {
    for (const key in this) {
      console.log(`${key}: ${this[key]}`);
    }
  }
}

module.exports = Employee;
