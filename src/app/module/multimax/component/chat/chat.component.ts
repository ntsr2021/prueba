import { Component, OnInit } from '@angular/core';

declare var $:any;


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})


export class ChatComponent implements OnInit {

	showChat = true; 

  constructor() { }

  ngOnInit(): void {
  }

}
