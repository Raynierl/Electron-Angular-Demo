import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DemoapiService {

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<any>{
    // return this.http.get(`http://localhost:3000/products`).pipe(
    //   map((x: any) => x.results),
    //     shareReplay()
    // )
    return this.http.get(`http://localhost:3000/products`).pipe(
      shareReplay()
    );
  }
  public getProductById(id): Observable<any>{
    return this.http.get(`http://localhost:3000/products/` + id);
  }
  public postProduct(product): Observable<any>{
    const headers = { 'content-type': 'application/json'};
    return this.http.post<any>(`http://localhost:3000/products`,JSON.stringify(product) , {'headers' : headers})
  }
  public patchProduct(id, edits): Observable<any>{
    return this.http.post<any>(`http://localhost:3000/products/` + id, edits);
  }
  public deleteProductById(id): Observable<any>{
    return this.http.delete(`http://localhost:3000/products/` + id);
  }
  public updateProductById(id,body): Observable<any>{
    return this.http.put<any>(`http://localhost:3000/products/` + id, body);
  }
  public patchProductById(id,body): Observable<any>{
    return this.http.patch<any>(`http://localhost:3000/products/` + id, body);
  }
}
