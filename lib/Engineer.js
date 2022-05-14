const Employee = require('./Employee');
class Manager extends Employee{
    constructor(name, id, email, github) {

        super(name, id, email);
    
        this.github = github;
        }
    
    getRole = function(){
        return "Engineer";
    }
  }

module.exports = Manager;