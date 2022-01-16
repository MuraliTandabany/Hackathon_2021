import { HttpClient } from '@angular/common/http';
import { FilterService } from './../../../services/filter.service';
import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(public fs:FilterService, private restService: RestService) { }

  ngOnInit(): void {
  }

  onChangeSearchText() {
    this.fs.searchForMaps();
  }

}
