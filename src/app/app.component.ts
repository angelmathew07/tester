 import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Post} from './post.model';
import {postsService} from './post.service';
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'app-http';
  isFetching=false;
  private errorMessage : Subscription
  loadedPosts:Post[]=[];
  error=null
  @ViewChild('f')signup:NgForm
constructor(private http:HttpClient,private postservice : postsService){}

  onCreate(postData:{title:string,content:string}){
  this.postservice.onCreate(postData)
  
   }
  ngOnInit(){
   // this.fetchPosts()
    this.errorMessage=this.postservice.errorMessage.subscribe((data)=>{
      this.error=data
      console.log("data "+data)
    })
  }

  onFetchPosts(){
    this.isFetching=true
this.postservice.onFetch().subscribe((data)=>
{
  this.isFetching=false
  this.loadedPosts=data
},error=>{
 // this.error=error.error.error;
 // console.log(error)

})
console.log("on fetch called")
  }
   
  onClearPosts(){
   this.postservice.onDelete().subscribe(()=>
    {
     this.loadedPosts=[]
    })
  }

  ngOnDestroy(){
    this.errorMessage.unsubscribe();
  }
}
