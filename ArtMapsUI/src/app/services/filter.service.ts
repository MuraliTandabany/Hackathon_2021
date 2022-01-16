import { Injectable } from '@angular/core';
import { FilterModel } from '../models/filter.model';
import { RestService } from './rest.service';
import * as _ from 'underscore';
import { DomSanitizer } from '@angular/platform-browser';
import {CartService} from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  filter: FilterModel = new FilterModel();

  searchText;
  searchCallPending = false;

  public typeLabelMap = {
    city: 'City Map',
    country: 'Country Map',
    island: 'Island Map',
    stateProvince: 'State & Province Map',
    region: 'Regional Map',
    world: 'World Map',
  };

  sortOptions: any = [
    {
      label: 'Price',
      value: 'price'
    },
    {
      label: 'Best Selling',
      value: 'bestSelling'
    },
    {
      label: 'Discount',
      value: 'discount'
    }
  ];

  options: any = {
    color: [
      {
        label: 'Blue',
        value: 'blue',
        checked: false
      },
      {
        label: 'Green',
        value: 'green',
        checked: false
      },
      {
        label: 'Turquoise',
        value: 'turquoise',
        checked: false
      },
      {
        label: 'Grey',
        value: 'grey',
        checked: false
      }
    ],
    type: [
      {
        label: 'City Maps',
        value: 'city',
        checked: false
      },
      {
        label: 'Country Maps',
        value: 'country',
        checked: false
      },
      {
        label: 'Island Maps',
        value: 'island',
        checked: false
      },
      {
        label: 'State & Province Maps',
        value: 'stateProvince',
        checked: false
      },
      {
        label: 'Regional Maps',
        value: 'region',
        checked: false
      },
      {
        label: 'World Maps',
        value: 'world',
        checked: false
      }
    ],
    size: [
      {
        label: '18 X 24 inches',
        value: '18_24_inches',
        checked: false
      },
      {
        label: '24 X 36 inches',
        value: '24_36_inches',
        checked: false
      },
      {
        label: '36 X 48 inches',
        value: '36_48_inches',
        checked: false
      },
      {
        label: '4 X 5 foot',
        value: '4_5_ft',
        checked: false
      },
      {
        label: '5 X 8 foot',
        value: '5_8_ft',
        checked: false
      }
    ],
    freeShipping: true
  };

  data: any = [
    {
      id: 100001,
      display: false,
      color: 'blue',
      type: 'island',
      freeShipping: true,
      size: '18_24_inches',
      name: 'Vancouver Island',
      category: 'Art Map',
      sellingPrice: 80,
      price: 57.50,
      unit: 'US$',
      discount: 10,
      labels: [
        {
          label: 'Best seller',
          value: 'bestSeller',
        },
        {
          label: 'Free delivery',
          value: 'freeDelivery',
        }
      ],
      imgData: null,
      imgName: 'vancouver.png',
      imgPath: './../../../../../assets/images/maps/vancouver.png'
    },
    {
      id: 100002,
      display: false,
      color: 'grey',
      type: 'city',
      freeShipping: true,
      size: '24_36_inches',
      name: 'London',
      category: 'Art Map',
      sellingPrice: 120,
      price: 85.75,
      unit: 'US$',
      discount: 8,
      labels: [],
      imgData: null,
      imgName: 'london-grey.png',
      imgPath: './../../../../../assets/images/maps/london-grey.png'
    },
    {
      id: 100003,
      display: false,
      color: 'blue',
      type: 'stateProvince',
      freeShipping: true,
      size: '24_36_inches',
      name: 'North Carolina state',
      category: 'Art Map',
      sellingPrice: 120,
      price: 87.75,
      unit: 'US$',
      discount: 8,
      labels: [],
      imgData: null,
      imgName: 'northcarolina.png',
      imgPath: './../../../../../assets/images/maps/northcarolina.png'
    },
    {
      id: 100004,
      display: false,
      color: 'green',
      type: 'country',
      freeShipping: true,
      size: '36_48_inches',
      name: 'Japan (Green)',
      category: 'Art Map',
      sellingPrice: 123,
      price: 98.50,
      unit: 'US$',
      discount: 10,
      labels: [
        {
          label: 'Free delivery',
          value: 'freeDelivery',
        }
      ],
      imgData: null,
      imgName: 'japan-green.png',
      imgPath: './../../../../../assets/images/maps/japan-green.png'
    },
    {
      id: 100005,
      display: false,
      color: 'blue',
      type: 'city',
      freeShipping: true,
      size: '36_48_inches',
      name: 'Mumbai',
      category: 'Art Map',
      sellingPrice: 123,
      price: 108.50,
      unit: 'US$',
      discount: 10,
      labels: [
        {
          label: 'Free delivery',
          value: 'freeDelivery',
        }
      ],
      imgData: null,
      imgName: 'mumbai.png',
      imgPath: './../../../../../assets/images/maps/mumbai.png'
    },
    {
      id: 100006,
      display: false,
      color: 'turquoise',
      type: 'city',
      freeShipping: false,
      size: '4_5_ft',
      name: 'Singapore (Turquoise)',
      category: 'Art Map',
      sellingPrice: 108,
      price: 120,
      unit: 'US$',
      discount: 10,
      labels: [
        {
          label: 'Best seller',
          value: 'bestSeller',
        },
        {
          label: 'Free delivery',
          value: 'freeDelivery',
        }
      ],
      imgData: null,
      imgName: 'singapore-turquoise.png',
      imgPath: './../../../../../assets/images/maps/singapore-turquoise.png'
    },
    {
      id: 100007,
      display: false,
      color: 'blue',
      type: 'country',
      freeShipping: true,
      size: '4_5_ft',
      name: 'Japan',
      category: 'Art Map',
      sellingPrice: 58,
      price: 42,
      unit: 'US$',
      discount: 8,
      labels: [
        {
          label: 'Best seller',
          value: 'bestSeller',
        }
      ],
      imgData: null,
      imgName: 'japan.png',
      imgPath: './../../../../../assets/images/maps/japan.png'
    },
    {
      id: 100008,
      display: false,
      color: 'blue',
      type: 'city',
      freeShipping: false,
      size: '5_8_ft',
      name: 'Singapore',
      category: 'Art Map',
      sellingPrice: 120,
      price: 120,
      unit: 'US$',
      discount: null,
      labels: [
        {
          label: 'Best seller',
          value: 'bestSeller',
        },
        {
          label: 'Free delivery',
          value: 'freeDelivery',
        }
      ],
      imgData: null,
      imgName: 'singapore.png',
      imgPath: './../../../../../assets/images/maps/singapore.png'
    },
    {
      id: 100009,
      display: false,
      color: 'grey',
      type: 'city',
      freeShipping: true,
      size: '5_8_ft',
      name: 'Amsterdam',
      category: 'Art Map',
      sellingPrice: 50,
      price: 40,
      unit: 'US$',
      discount: 20,
      labels: [
        {
          label: 'Best seller',
          value: 'bestSeller',
        }
      ],
      imgData: null,
      imgName: 'amsterdam-grey.png',
      imgPath: './../../../../../assets/images/maps/amsterdam-grey.png'
    }
  ];

  constructor(private restService: RestService, private sanitizer: DomSanitizer, private cs: CartService) {
    this.init();
  }

  init() {
    console.log('FilterService init');
    this.searchForMaps();
  }

  refresh() {
    this.data.forEach(mapObj => {
      mapObj.cartSize = this.cs.getCartSizeForMap(mapObj.id);
      let display = false;
      if (_.find(this.options.color, (option) => option.checked === true)) {
        this.options.color.forEach(filterOption => {
          if (filterOption.checked && mapObj.color === filterOption.value) {
            display = true;
            return;
          }
        });
      }
      if (display) {
        mapObj.display = true;
        return;
      }
      if (_.find(this.options.type, (option) => option.checked === true)) {
        this.options.type.forEach(filterOption => {
          if (filterOption.checked && mapObj.type === filterOption.value) {
            display = true;
            return;
          }
        });
      }
      if (display) {
        mapObj.display = true;
        return;
      }
      if (_.find(this.options.size, (option) => option.checked === true)) {
        this.options.size.forEach(filterOption => {
          if (filterOption.checked && mapObj.size === filterOption.value) {
            display = true;
            return;
          }
        });
      }
      if (display) {
        mapObj.display = true;
        return;
      }
      if ((mapObj.freeShipping && this.options.freeShipping) || (!mapObj.freeShipping && !this.options.freeShipping)) {
        display = true;
      }
      mapObj.display = display;
    });
  }

  public searchForMaps() {
    this.searchCallPending = true;
    this.restService.get('/api/maps/artmaps').subscribe((data: Array<any>) => {
      this.refresh();
      this.searchCallPending = false;
      console.log(data);
      if (data && data.length > 0) {
        data.forEach(resItem => {
          const obj = _.find(this.data, staticItem => {
            return resItem.fileName === staticItem.imgName;
          });
          if (obj) {
            const objectURL = 'data:image/jpeg;base64,' + resItem.fileContent;
            obj.imgPath = this.sanitizer.bypassSecurityTrustUrl(objectURL);

            console.log(obj);
          }
        });
      }
    });
  }

  clearFilter() {
    this.options.color.forEach(filterOption => {
      filterOption.checked = false;
    });
    this.options.type.forEach(filterOption => {
      filterOption.checked = false;
    });
    this.options.freeShipping = true;
    this.refresh();
  }

  sanitizeUrl(imgBase64) {
    return this.sanitizer.bypassSecurityTrustUrl(imgBase64);
  }

}
