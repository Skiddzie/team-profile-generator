const Employee = require('../lib/Employee.js');

test('creates new Employee object', () => {
    const employee = new Employee("dave", "32512", "babo@googah.com");
  
    expect(employee.name).toEqual(expect.any(String));
    expect(employee.id).toEqual(expect.any(String));
    expect(employee.email).toEqual(expect.any(String));
  });
test('getRole should return string', () => {
    const employee = new Employee("Aidan", "32512", "babo@googah.com", "skiddzie");

    expect(employee.getRole()).toEqual(expect.any(String));
});