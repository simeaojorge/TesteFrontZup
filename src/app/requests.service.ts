import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class RequestsService {

    private url: string = "";
    private dados: Object;
    private tipo: string;
    
    constructor(private http: Http) { }

    enviar(url: string = "", dados: Object = {}, tipo: string = "get"): Observable<any>{
        this.url = "https://api.dribbble.com/v1/"+url;
        this.dados = dados;
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
        for(let data in this.dados){
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
        
        this.url += 'access_token=6d33037c177cb4fa5d29c94d0c066b5943e0b03cbb82776da4026103e46db4e6';
    }
    
    _get(): Observable<any>{

        this.formatUrl();
        this.adicionaAccessToken();
        return this.http.get(this.url)
                        .map(response => response.json())
                        .catch(error => Observable.throw(error.json().error));
    }
    
    _post(): Observable<any>{
        
        this.adicionaAccessToken();
        this.adicionaAccessToken();
        return this.http.post(this.url, this.dados)
                        .map(response => response.json())
                        .catch(error => Observable.throw(error.json().error));
    }
    
    _put(): Observable<any>{
        
        this.adicionaAccessToken();
        return this.http.put(this.url, this.dados)
                        .map(response => response.json())
                        .catch(error => Observable.throw(error.json().error));
    }
    
    _delete(): Observable<any>{
        
        this.formatUrl();
        this.adicionaAccessToken();
        return this.http.delete(this.url)
                        .map(response => response.json())
                        .catch(error => Observable.throw(error.json().error));
    }
}
