import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'category' })
export class SortList implements PipeTransform {
  transform(list: any, keyName: string): any {
    if(keyName === 'siteRating'){
      list.sort((a, b) => {
        if (a[keyName] < b[keyName]) return 1;
        else if (a[keyName] > b[keyName]) return -1;
        else return 0;
      });
    }
    else{
      list.sort((a, b) => {
        if (a[keyName] < b[keyName]) return -1;
        else if (a[keyName] > b[keyName]) return 1;
        else return 0;
      });
    }
    

    return list;
  }
}