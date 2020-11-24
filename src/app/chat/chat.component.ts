import { Component, OnInit } from '@angular/core';
import * as socketIo from  'socket.io-client';
import { FormControl } from '@angular/forms';
import { ChatService } from '../chat.service';
import { UserService } from '../user.service';
import {Validators , FormGroup , FormBuilder} from '@angular/forms';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  message = new FormControl('');
  title = 'ciechat';
  chatUser ="";
  public users : any [];
  public obj : any;
  public messages : any [];
  public msgObj;
  public new_msg;
  
  constructor(private chatService : ChatService , private user : UserService , private fb : FormBuilder , private ms : MessageService) {
    this.chatService.getObservable().subscribe((res) =>this.messages.push(res));
   }

  public currentUsername  = this.user.userData.username;
  
  onSubmit(){
    this.msgObj = {
      user : this.currentUsername,
      receiver : this.chatUser,
      message : this.messageForm.value.message
    };
    this.chatService.sendMessage(this.msgObj);   
    this.messageForm.setValue({message: ''});
  }


  displayedColumns = [ 'name'];
  getOnlineUsers(){
    this.chatService.getUsers().subscribe((res)=>{
      this.users = res;
    });
  }

  messageForm = this.fb.group(
    { 
      message:['',[Validators.required]]
    });

  

  selectedUser(data){
    this.chatUser = data;
    this.obj = {
      sendUser : this.user.userData.username , 
      receivedUser : data
    };
    this.chatService.getMessages(this.obj).subscribe((res)=>{
      this.messages = res.messages;
    });
  }
  ngOnInit(){   
    this.chatService.getUsers().subscribe((res)=>{
      this.users = res;
    });
  }
}
