var expect=require('expect');

var {generateMessage,generateLocationMessage}=require('./message');

describe('generateMessage',()=>{
  it('should generate correct message object',()=>{
    var from='rajat';
    var text='Some message';
    var message=generateMessage(from,text);

    expect(message.createdAt).toBeA('number');
    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
  });
});

describe('generateLocationMessage',()=>{
  it ('should generate correct location object',()=>{
    var from='Ankit';
    var latitude=19;
    var longitude=15;
    var url='https://www.google.com/maps/?q=19,15';
    var location =generateLocationMessage(from,latitude,longitude);

    expect(location).toInclude({from,url});
    expect(location.createdAt).toBeA('number');

  });
});
