const Manager = require('../lib/Manager.js');

test('creates new Manager object', () => {
    const manager = new Manager("dave", "32512", "babo@googah.com", "0001");
    
    expect(manager.name).toEqual(expect.any(String));
    expect(manager.id).toEqual(expect.any(String));
    expect(manager.email).toEqual(expect.any(String));
    expect(manager.officeNumber).toEqual(expect.any(String));
  });
test('getRole should return string', () => {
    const manager = new Manager("dave", "32512", "babo@googah.com", "0001");

    expect(manager.getRole()).toEqual(expect.any(String));
});