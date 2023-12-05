import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DataService {
  private data: any = null;

  /**
   *
   * TODO
   * statt diesem dataservice, einfach den configservice!
   */

  getData(): any {
    return this.data;
  }

  setData(data: any) {
    this.data = data;
  }
}
