import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  public new_message;

  getMessage(){
    return this.new_message;
  }
}
