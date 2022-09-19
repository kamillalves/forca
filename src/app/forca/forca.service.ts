import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ForcaService {

  constructor(public http:HttpClient) {}

  buscarpalavra(){
    return this.http.get('https://api.dicionario-aberto.net/random')
  }
}
