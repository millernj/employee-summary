module.exports = class Employee {
  constructor(name, id, email, role = 'Employee') {
    this.name = name;
    this.id = id;
    this.email = email;
    this.role = role;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }
  
  getEmail() {
    return this.email;
  }

  getRole() {
    return this.role;
  }
}