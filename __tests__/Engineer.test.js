const Engineer = require('../lib/Engineer.js');

test('creates new Engineer object', () => {
    const engineer = new Engineer("Aidan", "32512", "babo@googah.com", "skiddzie");
    
    expect(engineer.name).toEqual(expect.any(String));
    expect(engineer.id).toEqual(expect.any(String));
    expect(engineer.email).toEqual(expect.any(String));
    expect(engineer.github).toEqual(expect.any(String));
  });
test('getRole should return string', () => {
    const engineer = new Engineer("Aidan", "32512", "babo@googah.com", "skiddzie");

    expect(engineer.getRole()).toEqual(expect.any(String));
});