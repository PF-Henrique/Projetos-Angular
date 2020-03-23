import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL = 'http://www.server.com/api/';

  API_KEY = '';

  constructor(private httpClient: HttpClient) { }

  // firstPage para armazenar o URL da primeira página,
  public firstPage = '';

  // prevPage para armazenar o URL da página anterior,
  public prevPage = '';

  // nextPage para armazenar o URL da próxima página,
  public nextPage = '';

  // lastPage para armazenar o URL da última página.
  public lastPage = '';


  // O .createCustomermétodo que pega um parâmetro do Customertipo e o envia ao servidor.
  public createCustomer(customer: Customer) {
    return this.httpClient.post(`${this.apiURL}/customers/`, customer);
  }

  // O .updateCustomermétodo para atualizar um cliente,//
  public updateCustomer(customer: Customer) {
    return this.httpClient.put(`${this.apiURL}/customers/${customer.id}`, customer);
  }

  // O .deleteCustomermétodo para excluir um cliente por ID,//
  public deleteCustomer(id: number) {
    return this.httpClient.delete(`${this.apiURL}/customers/${id}`);
  }

  // O .getCustomerByIdmétodo para obter um cliente por ID.//
  public getCustomerById(id: number) {
    return this.httpClient.get(`${this.apiURL}/customers/${id}`);
  }

  // implementa a lógica para obter páginas de dados do servidor.//
  public getCustomers(url?: string) {
    if (url) {
      return this.httpClient.get<Customer[]>(url, { observe: 'response' }).pipe(tap(res => {
        this.retrieve_pagination_links(res);
      }));
    }

    return this.httpClient.get<Customer[]>(`${this.apiURL}/customers?page=1`,
      { observe: 'response' }).pipe(tap(res => {
        this.retrieve_pagination_links(res);
      }));
  }

  parse_link_header(header) {
    if (header.length === 0) {
      return;
    }

    const parts = header.split(',');
    const links = {};
    parts.forEach(p => {
      const section = p.split(';');
      const url = section[0].replace(/<(.*)>/, '$1').trim();
      const name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;

    });
    return links;
  }

  public retrieve_pagination_links(response) {
    const linkHeader = this.parse_link_header(response.headers.get('Link'));
    this.firstPage = linkHeader[''];
    this.lastPage = linkHeader[''];
    this.prevPage = linkHeader[''];
    this.nextPage = linkHeader[''];
  }
}

