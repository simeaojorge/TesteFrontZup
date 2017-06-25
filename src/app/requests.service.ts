import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class RequestsService {

    private url: string = "";
    private dados: string = "";
    private tipo: string;

    private access_token = "c6d6ae8f82e0f0e339ff9bac3ab4b267609ebd623f3d916942aadbf01cbcad68";
    
    
    constructor(private http: Http) {
        
    }

    enviar(url: string = "", dados: Object = {}, tipo: string = "get", concatUrl: boolean = true): Observable<any>{
        
        this.url = (concatUrl)? "https://api.dribbble.com/v1/"+url : url;
        this.dados = JSON.stringify(dados);
        this.tipo = tipo;
        
        return this.selectMetodo();
    }
    
    selectMetodo(){
        
        switch(this.tipo){
        case 'get':
            return this._get();
        case 'post':
            return this._post();
        case 'put':
            return this._put();
        case 'delete':
            return this._delete();
        }
    }
    
    formatUrl(){
        for(let data in JSON.parse(this.dados)){
            if(this.url.indexOf("?") >= 0)
                this.url += '&';
            else
                this.url += '?';
            
            this.url += data+'='+this.dados[data]
        }
    }
    
    adicionaAccessToken(){
        if(this.url.indexOf("?") >= 0)
            this.url += '&';
        else
            this.url += '?';
        
        this.url += 'access_token='+this.access_token;
    }
    
    _get(): Observable<any>{

        this.formatUrl();
        this.adicionaAccessToken();
        
        let header = new Headers({ 'if-modified-since': 'Sun, 25 Jun 2000 15:45:36 GMT' });
        
        return this.http.get(this.url, { headers: header})
                        .map(retorno => this.sucesso(retorno))
                        .catch(error => this.falha(error));
    }
    
    _post(): Observable<any>{
        
        this.adicionaAccessToken();
        return this.http.post(this.url, this.dados)
                        .map(retorno => this.sucesso(retorno))
                        .catch(error => this.falha(error));
    }
    
    _put(): Observable<any>{
        
        this.adicionaAccessToken();
        
        return this.http.put(this.url, this.dados)
                        .map(retorno => this.sucesso(retorno))
                        .catch(error => this.falha(error));
    }
    
    _delete(): Observable<any>{
        
        this.formatUrl();
        this.adicionaAccessToken();
        return this.http.delete(this.url)
                        .map(retorno => this.sucesso(retorno))
                        .catch(error => this.falha(error));
    }
    
    sucesso(retorno){
        
        if(retorno)
            return retorno.json();
        else
            return retorno;
    }
    
    falha(error){
        
        error = (error.status == '404')? 'Página não encontrada' : error.json().error; 
        return Observable.throw(error);
    }
    
    setAccessToken(token){
        this.access_token = token;
    }
}
