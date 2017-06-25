import { Injectable } from '@angular/core';

@Injectable()
export class ParamentrosService {

    private tamanho = "normal";
    private list = "";
    private timeframe = "";
    private sort = "";
    
    constructor() { }
    
    setTamanho(tamanho){
        
        this.tamanho = tamanho
    }
    
    getTamanho(){
       return this.tamanho;
    }
    
    setList(valor){
     
        this.list = valor;
    }
    
    getList(){
       
        return this.list;
    }
    
    setTimeframe(valor){
        
        this.timeframe = valor;
    }
    
    getTimeframe(){
        
        return this.timeframe;
    }
    
    setSort(valor){
        
        this.sort = valor;
    }
    
    getSort(){
        
        return this.sort;
    }

}
