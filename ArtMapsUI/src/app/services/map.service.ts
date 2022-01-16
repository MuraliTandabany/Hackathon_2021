import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private restService: RestService) { }

}
