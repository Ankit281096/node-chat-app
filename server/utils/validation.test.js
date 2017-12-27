const expect=require('expect');

var {isRealString}=require('./validation');

describe('isRealString',()=>{
  it('should reject non-string values',()=>{
    var string=405;
    var result=isRealString(string);
    expect(result).toBe(false);
  });

  it('should reject string with only spaces',()=>{
    var string='       ';
    var result=isRealString(string);
    expect(result).toBe(false);
  });

  it('should allow string with non-space characters',()=>{
    var string='   ankit   ';
    var result=isRealString(string);
    expect(result).toBe(true);
  });
});
