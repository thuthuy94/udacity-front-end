import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public filePath = '/assets/data.json';

  constructor(protected httpClient: HttpClient) {}

  public getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.filePath);
  }

  public getProductById(id: number): Observable<Product | any> {
    const response = this.httpClient.get<Product[]>(this.filePath);
    const product = response.pipe(
      map(res => {
        return res.find(e => e.id === id);
      })
    );

    return product;
  }
}
