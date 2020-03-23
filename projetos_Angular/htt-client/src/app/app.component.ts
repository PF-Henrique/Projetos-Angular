import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { Customer } from './model/customer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'htt-client';

  constructor(private apiService: ApiService) { }

  create() {
    this.apiService.createCustomer(Customer).subscribe((res) => {
      console.log('Created a customer');
    });
  }

}
