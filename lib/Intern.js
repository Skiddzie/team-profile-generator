const Employee = require('./Employee');
class Manager extends Employee{
    constructor(name, id, email, school) {

        super(name, id, email);
    
        this.school = school;
        }
    
    getRole = function(){
        return "Intern";
    }
  }

module.exports = Manager;