import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../requests.service';

@Component({
  selector: 'app-show-shots',
  templateUrl: './show-shots.component.html',
  styleUrls: ['./show-shots.component.css']
})
export class ShowShotsComponent implements OnInit {

  constructor(private request: RequestsService) { }

  private pagina:number = 1;
  private perPage: number = 20;
  private shotList: Array<Object> = [];
  public tamanho = 'normal';
  
  private pesquisa: string = "";
  
  ngOnInit() {
      this.loadShots();
  }
  
  loadShots(){
      let self = this;
      
      this.request.enviar("shots?page="+this.pagina+"&per_page="+this.perPage)
      .subscribe(
              function(retorno){
                  self.shotList = self.shotList.concat(retorno);
              }
      );
  }
  
  scroll(){
      this.pagina++;
      this.loadShots();
  }
  
  alteraTamanho(tamanho){
      
      this.tamanho = (tamanho == 1)? "teaser" : (tamanho == 2) ? "normal" : "hidpi";
  }

}
