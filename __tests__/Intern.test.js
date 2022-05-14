const Intern = require('../lib/Intern.js');

test('creates new Intern object', () => {
    const intern = new Intern("dave", "32512", "babo@googah.com", "rutgers");
    
    expect(intern.name).toEqual(expect.any(String));
    expect(intern.id).toEqual(expect.any(String));
    expect(intern.email).toEqual(expect.any(String));
    expect(intern.school).toEqual(expect.any(String));
  });
test('getRole should return string', () => {
    const intern = new Intern("dave", "32512", "babo@googah.com", "rutgers");

    expect(intern.getRole()).toEqual(expect.any(String));
});