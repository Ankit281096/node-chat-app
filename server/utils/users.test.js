const expect=require('expect');

const {Users}=require('./users');

describe('Users',()=>{
  var users;

beforeEach(()=>{
  users=new Users();
  users.users=[{
    id:'1',
    name:'Harshit',
    room:'Room No. 415'
  },{
    id:'2',
    name:'Aniket',
    room:'Room No. 249'
  },{
    id:'3',
    name:'Abhishek',
    room:'Room No. 415'
  }];
});


  it('should add new user',()=>{
    var users=new Users();
    var user={
      id:'123456',
      name:'Ankit',
      room: 'The Home fans'
    };
    var resUser=users.addUser(user.id,user.name,user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove a user',()=>{
    var userId='1';
    var user=users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user',()=>{
    var userId='99';
    var user=users.removeUser(userId);

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find a user',()=>{
      var userId='2';
      var user=users.getUser(userId);

      expect(user.id).toBe(userId);
  });

  it('should not find a user',()=>{
    var userId='99';
    var user=users.getUser(userId);

    expect(user).toNotExist();
  });

  it('should return names for Room No. 415',()=>{
    var userList=users.getUserList('Room No. 415');

    expect(userList).toEqual(['Harshit','Abhishek']);
  });

  it('should return names for Room No. 249',()=>{
    var userList=users.getUserList('Room No. 249');

    expect(userList).toEqual(['Aniket']);
  });
});
