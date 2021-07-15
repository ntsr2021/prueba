import { Component, OnInit } from '@angular/core';

declare var $:any;


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})


export class ChatComponent implements OnInit {

	showChat = false; 

  constructor() { }

  ngOnInit(): void {
  }

  expandirChat()
  {
  	if(!this.showChat)
  	{
			$('#chat-content').animate({'height':255}, 200);		
			this.showChat = true;    	
  	}else 
  	{
  		$('#chat-content').animate({'height':55}, 200);			
			this.showChat = false;  
  	}
  }

}
