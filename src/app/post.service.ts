import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Post} from './post.model'
import{map} from 'rxjs/operators'
import {Subject} from 'rxjs'

@Injectable({providedIn:'root'})
export class postsService{
  errorMessage=new Subject<string>()
    
    constructor(private http:HttpClient){}
    onFetch(){
      let multipleParams=new HttpParams()
      multipleParams=multipleParams.append("new","one")
      multipleParams=multipleParams.append("old","two")
        return this.http.get<{[key:string]:Post}>("https://ng-complete-guide-787a8.firebaseio.com/post.json",
        {
          params:multipleParams
        }).
        pipe(map(responseData=>{
          console.log("responseData "+responseData)
        
          const postArray:Post[]=[]
          for(const key in responseData){
            if(responseData.hasOwnProperty(key)){
            postArray.push({...responseData[key],id:key})
          }
          console.log("responseData[key] "+responseData[key])
          console.log("key "+key)
        }
          console.log("postArray"+postArray)
    return postArray
    
        })
        )
       
    }

    onDelete(){
        return this.http.delete("https://ng-complete-guide-787a8.firebaseio.com/post.json")
      
    }

    
  onCreate(postData:{title:string,content:string}){
    console.log("step1")
    this.http.post<{name:string}>("https://ng-complete-guide-787a8.firebaseio.com/post.json",postData)
    .subscribe(
      (responseData)=>{
        console.log("this is called "+responseData)
      }
    ,error=>{
      this.errorMessage.next(error.message)
      console.log("step2 "+this.errorMessage)
    })
  }

}