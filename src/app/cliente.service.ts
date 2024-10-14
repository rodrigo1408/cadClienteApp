import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

// Interface que define o modelo de cliente
export interface Cliente {
  nome: string;
  email: string;
  dataCadastro: Date;
}

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private clientesCollection = this.firestore.collection<Cliente>('clientes');  // Cria uma coleção chamada 'clientes'

  constructor(private firestore: AngularFirestore) {}

  // Método para adicionar um novo cliente ao Firestore
  addCliente(cliente: Cliente): Promise<any> {
    return this.clientesCollection.add(cliente);  // Salva o cliente no Firestore
  }

  // Método para buscar todos os clientes cadastrados no Firestore
  getClientes(): Observable<Cliente[]> {
    return this.clientesCollection.valueChanges();  // Retorna a lista de clientes
  }
}
