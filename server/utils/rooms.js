class Rooms {
  constructor() {
    this.rooms=[];
  }

  addRoom(newRoom){
    var isRoomExisting=this.rooms.filter((room)=>room===newRoom);

    if(isRoomExisting.length === 1){
      return ;
    }else {
      this.rooms.push(newRoom);
    }

    return newRoom;
  }

  removeRoom(roomToCheck,numberOfUsers){
    var roomToFind=this.rooms.filter((room)=> room===roomToCheck)[0];

    if (roomToFind){
      if(numberOfUsers){
        return;
      }else {
        this.rooms=this.rooms.filter((room)=>room !== roomToCheck);
      }
    }

    return ;
  }
getRoomList(){
  return this.rooms;
}

}

module.exports={Rooms};
