import { Component } from '@angular/core';
import { ClienteService, Cliente } from '../cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage {
  cliente: Cliente = { nome: '', idade: 0, dataCadastro: new Date() };  // Inclui a data atual

  constructor(private clienteService: ClienteService) {}

  cadastrarCliente() {
    this.cliente.dataCadastro = new Date();  // Define a data de cadastro como a data atual
    this.clienteService.addCliente(this.cliente).then(() => {
      console.log('Cliente cadastrado com sucesso!');
      this.cliente = { nome: '', idade: 0, dataCadastro: new Date() };  // Limpa o formulário e reinicia a data
    }).catch((error) => {
      console.error('Erro ao cadastrar cliente:', error);
    });
  }
}
