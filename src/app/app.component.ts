import { Component } from '@angular/core';
import { ParamentrosService } from './parametros.service';
import { Router } from '@angular/router';
import { RequestsService } from './requests.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
    constructor(private param: ParamentrosService, private router: Router, private request: RequestsService) {
    }

    private shotPesquisa: string = "";
    private htmlPesquisa: string = "";
    private opcoesFiltroShot: Array<Object> = [
                                               {
                                                   "filtro": "list",
                                                   "opcoes": [{
                                                       "descricao": "Todos",
                                                       "valor": ""
                                                   },
                                                   {
                                                       "descricao": "Animated",
                                                       "valor": "animated"
                                                   },
                                                   {
                                                       "descricao": "Attachments",
                                                       "valor": "attachments"
                                                   },
                                                   {
                                                       "descricao": "Debuts",
                                                       "valor": "debuts"
                                                   },
                                                   {
                                                       "descricao": "Playoffs",
                                                       "valor": "playoffs"
                                                   },
                                                   {
                                                       "descricao": "Rebounds",
                                                       "valor": "rebounds"
                                                   },
                                                   {
                                                       "descricao": "Teams",
                                                       "valor": "teams"
                                                   }]
                                               },
                                               {
                                                   "filtro": "timeframe",
                                                   "opcoes": [{
                                                       "descricao": "Agora",
                                                       "valor": ""
                                                   },
                                                   {
                                                       "descricao": "Semana passada",
                                                       "valor": "week"
                                                   },
                                                   {
                                                       "descricao": "Mês passado",
                                                       "valor": "month"
                                                   },
                                                   {
                                                       "descricao": "Ano passado",
                                                       "valor": "year"
                                                   },
                                                   {
                                                       "descricao": "De sempre",
                                                       "valor": "ever"
                                                   }]
                                               },
                                               {
                                                   "filtro": "sort",
                                                   "opcoes": [{
                                                       "descricao": "Populares",
                                                       "valor": ""
                                                   },
                                                   {
                                                       "descricao": "Mais comentados",
                                                       "valor": "comments"
                                                   },
                                                   {
                                                       "descricao": "Mais recentes",
                                                       "valor": "recent"
                                                   },
                                                   {
                                                       "descricao": "Mais visualizados",
                                                       "valor": "views"
                                                   }]
                                               }
                                               ];
    
    alteraTamanho(tamanho){
        
        this.param.setTamanho( (tamanho == 1)? "teaser" : (tamanho == 2) ? "normal" : "hidpi");
    }
    
    adicionaParam(filtro, valor){
        
        switch(filtro){
        case 'list':
            this.param.setList(valor);
            break;
        case 'sort':
            this.param.setSort(valor);
            break;
        case 'timeframe':
            this.param.setTimeframe(valor);
            break;
        }
        
        this.router.navigateByUrl('/Dummy', { skipLocationChange: true });
        setTimeout(() => {
            this.router.navigate(['']); 
        },0);
    }
    
    getParamEscolhido(tipo){
        
        let valor = "";
        
        switch(tipo){
        case 'list':
            valor = this.param.getList();
            break;
        case 'sort':
            valor = this.param.getSort();
            break;
        case 'timeframe':
            valor = this.param.getTimeframe();
            break;
        }
        
        for(let filtro of this.opcoesFiltroShot){
            
            if(filtro['filtro'] == tipo){
                for(let opcao of filtro['opcoes']){
                    if(opcao['valor'] == valor)
                        return opcao['descricao'];
                }
            }
        }
    }
    
    pesquisaShot(){
        this.request.enviar("https://dribbble.com/search/autocomplete?q="+this.shotPesquisa, {}, "get", false)
        .subscribe(
                retorno => {
                    this.htmlPesquisa = retorno;
                    console.log("teste");
                },
                retorno => {
                    this.htmlPesquisa = retorno;
                    console.log("teste");
                }
        );
    }
}