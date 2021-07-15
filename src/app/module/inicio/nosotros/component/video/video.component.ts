import { Component, OnInit } from '@angular/core';


declare var $:any;


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

	video = null;


  constructor() { }

  ngOnInit(): void {
    //$('#video-repro').attr('src', `assets/img/videos/quienes_somos.mp4`);
    
  }

}
