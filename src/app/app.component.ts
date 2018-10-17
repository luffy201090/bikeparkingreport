import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'bikepark';
  model = {
    name: undefined,
    amount: undefined,
    startDate: undefined,
    endDate: undefined,
  };

  getReport() {
    const { startDate, endDate, name, amount } = this.model;
    if (name === undefined || amount === undefined || startDate === undefined || endDate === undefined) {
      return;
    }
    const start = moment(startDate.toString());
    const end = moment(endDate.toString());

    return fetch('/bikepark', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify({ startDate: start.format('YYYY-MM-DD'), endDate: end.format('YYYY-MM-DD'), name, amount }),
    })
      .then(res => {
        window.location.href = '/Theo doi gui xe_HN_' + name + '.xlsx';
      });
  }
}
