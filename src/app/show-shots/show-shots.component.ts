import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestsService } from '../requests.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ParamentrosService } from '../parametros.service';

@Component({
  selector: 'app-show-shots',
  templateUrl: './show-shots.component.html',
  styleUrls: ['./show-shots.component.css']
})
export class ShowShotsComponent implements OnInit {

  constructor(private request: RequestsService, private params: ParamentrosService) {
  }

  private pagina:number = 1;
  private perPage: number = 20;
  private shotList: Array<Object> = [];
  
  private shot;
  private mouseOverShot: number|string = ""; 
  
  private pesquisa: string = "";
  
  @ViewChild('modalShot') modal: ModalComponent;
  
  ngOnInit() {
      this.loadShots();
  }
  
  loadShots(){
      let self = this;
      
      let dados = this.getParametros();
      
      this.request.enviar("shots?page="+this.pagina+"&per_page="+this.perPage+dados)
      .subscribe(
              function(retorno){
                  self.shotList = self.shotList.concat(retorno);
              }
      );
  }
  
  getDescription(shot){
      let description = "";
      
      let tamanho = (this.params.getTamanho() == 'teaser') ? 200 : 600;
      
      if(shot.description)
          description = (shot.description.length > tamanho) ? shot.description.substring(0, tamanho)+'(...)' : shot.description;
      return description;
  }
  
  scroll(){
      this.pagina++;
      this.loadShots();
  }
  
  mostraInfo(shot){
      this.mouseOverShot = shot.id;
  }
  
  showShot(id){
      this.request.enviar('shots/'+id)
      .subscribe(
              retorno => {
                  this.shot = retorno; 
                  this.modal.open('lg');
              }
      );
  }
  
  getTamanho(){
      return this.params.getTamanho();
  }
  
  getParametros(){
      
      let retorno = "";
      
      let list = this.params.getList();
      let time = this.params.getTimeframe();
      let order = this.params.getSort();
      
      if(list != "")
          retorno += "&list="+list;
      if(time != "")
          retorno += "&timeframe="+time;
      if(order != "")
          retorno += "&sort="+order;
      
      return retorno;
  }
}
