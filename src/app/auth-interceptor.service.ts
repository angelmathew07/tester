import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor{

    intercept(req:HttpRequest<any>,next:HttpHandler){
        console.log("request on iths way "+req)
        console.log("req url "+req.url)
const modifiedHeader=req.clone({headers:req.headers.append('Auth','xyz')})
        return next.handle(modifiedHeader)
        
    }
}