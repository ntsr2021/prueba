import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { promise } from 'protractor';
declare let $: any;
declare var google:any
 

function TraductorUso() {
  // alert('Hello!!!');
  new google.translate.TranslateElement({pageLanguage:'es',  includedLanguages : 'en,es,ar,zh-CN,zh-TW,ru', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 
          'google_translate_element');
    
    // $('.goog-te-combo').change( console.log('asd'));
    // console.log($('.goog-te-combo').val);
    // console.log(Request.Cookies["googtrans"].Value)
    var trans = $('select.goog-te-combo');
    // var trans = jQuery('select.goog-te-combo');
    console.log(trans);
    trans.prevObject[0].cookie="googtrans=/es/es"
  
   trans.change();
}

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit, AfterViewInit {

  constructor(private router: Router) { 
    console.log(this.router.url);

  }
  ngAfterViewInit(): void {
  
  
  }

  ngOnInit(): void {

    // this.clickBandera(this.idioma);
    
    setTimeout(function(){
      TraductorUso();
    },300);

    // const promise = new Promise((resolve,reject) => {
    //   hello();
    // });
    
    
      
  
  }

  clickBandera(idioma){
    // new google.translate.TranslateElement({pageLanguage:'es',  includedLanguages : 'en,es,ar,zh-CN,zh-TW,ru', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 
    // 'google_translate_element');

    console.log(idioma)
    let trans = $('select.goog-te-combo');
    trans.prevObject[0].cookie=`googtrans=/${idioma}`;

    trans.change();
    window.location.reload();
  }
  


}
