import { FilterService } from './../../../../services/filter.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  constructor(public fs:FilterService) { }

  ngOnInit(): void {
  }

  onClickFilterReset() {
    this.fs.clearFilter();

  }

  printOptions() {
    console.log(this.fs.options);
  }

  printTypeOptions() {
    console.log(this.fs.options.type);
  }

  printColorOptions() {
    console.log(this.fs.options.color);
  }

  onChangeFilter() {
    console.log(this.fs.options);
    this.fs.refresh();
  }

}
