import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestsService } from '../requests.service';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-view-shot',
  templateUrl: './view-shot.component.html',
  styleUrls: ['./view-shot.component.css']
})
export class ViewShotComponent implements OnInit {

  constructor(private request: RequestsService, private route: ActivatedRoute, @Inject(DOCUMENT) private document: any) {
  }

  private id: number;
  private code: string = "";
  private shot: Object;

  private opacity: string = "";
  private color: string = "";
  
  private liked: boolean = false;
  
  ngOnInit() {
      
      this.route.params.subscribe(params => {
         this.id = +params['id']; 
         this.getShot();
         this.getClassLike();
      });
      
      this.route.queryParams
      .subscribe(
              params => {
                  this.code = params['code'];
                  
                  if(this.code){
                      
                      let url = this.document.location.href.split("?")[0]; 
                      
                      this.request.enviar("https://dribbble.com/oauth/token?client_id=56b81aa2cf20c98d1d718cf1316b502c4480f218a472015ff2b838fbc426f50b&client_secret=fbc9e5f0e177a9bd9d659cf587ef3bfe97d0bfac432875b8fa6ab0d9dd4a2bab&code="+this.code+"&redirect_uri="+url, {}, "post", false)
                      .subscribe(
                              retorno => {
                                  this.request.setAccessToken(retorno['access_token']);
                                  window.location.href = url;
                              },
                              retorno => {
                                  setTimeout(()=>{console.log(retorno)},0);
                              }
                      );
  
                  }
              }
      );
  }
  
  getShot(){
      this.request.enviar("shots/"+this.id)
      .subscribe( retorno => {
          this.shot = retorno;
      }
      );
  }

  getClassLike(){
      
      this.request.enviar('shots/'+this.id+'/like')
      .subscribe( () => {
          this.opacity = "1.0";
          this.color = "blue";
          this.liked = true;
      },
      () => {
          this.opacity = "0.5";
          this.color = "";
          this.liked = false;
      })
  }
  
  likeShot(){
      
      let tipo = (this.liked)? "delete" : "post";
      
      this.request.enviar('shots/'+this.id+'/like', "", tipo)
      .subscribe( 
              retorno => {
                  this.getShot();
                  
                  this.opacity = (this.liked)? "0.5" : "1.0";
                  this.color = (this.liked)? "" : "blue";
                  this.liked = !this.liked;
              },
              () => {
                  let url = this.document.location.href.split('?')[0];
                  window.location.href = "https://dribbble.com/oauth/authorize?scope=write+public&client_id=56b81aa2cf20c98d1d718cf1316b502c4480f218a472015ff2b838fbc426f50b&redirect_uri="+url;
                  
              }
      )       
  }
}
