import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
@Injectable({
  providedIn: 'root'
})
export class ChatService{
  private url = 'http://localhost:3000';
  public socket = io(this.url);
  constructor(private user: UserService , private http : HttpClient , private ms : MessageService) {
   this.socket.emit('join' , this.user.userData.username);   
    
   this.socket.on('update-userData' , (data) => {
     this.user.userData.socket_id = data;
     console.log(this.user.userData.socket_id);
   });  
   
   
  }
  getObservable(){
    let observable = new Observable<any>(observer =>{
      this.socket.on('new-message' , (data)=>{
        observer.next(data);
      });
    });
    return observable;
  }
   sendMessage(obj){
      this.socket.emit('send-message' , obj);
    }  
    getUsers() :any {
      return this.http.get<any>(this.url + '/online-users');
    }

    getMessages(obj){
      console.log(obj);
      return this.http.get<any>(this.url + '/get-messages/'+ obj.sendUser +'/' + obj.receivedUser);
    }

}


