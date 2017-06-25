import { Component, OnInit, Input } from '@angular/core';
import { RequestsService } from '../requests.service';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css']
})
export class ComentarioComponent implements OnInit {

    @Input('url') url: string;
    private comments: Array<Object>;
  
  constructor(private request: RequestsService) { }

  ngOnInit() {
      
      this.url = this.url.replace("https://api.dribbble.com/v1/", "")
      this.getComments();
  }

  
  getComments(){
      
      this.request.enviar(this.url+'?per_page=1000')
      .subscribe(retorno => {
          this.comments = retorno; 
      });
  }
}
