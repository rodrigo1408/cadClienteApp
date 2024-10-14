import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ClienteService, Cliente } from '../cliente.service';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.page.html',
  styleUrls: ['./grafico.page.scss'],
})
export class GraficoPage implements OnInit {
  chart: any;

  constructor(private clienteService: ClienteService) {}

  ngOnInit() {
    this.clienteService.getClientes().subscribe(clientes => {
      this.criarGrafico(clientes);
    });
  }

  criarGrafico(clientes: Cliente[]) {
    // Agrupa os clientes por dia de cadastro e depois ordena as datas
    const clientesPorDia = this.agruparClientesPorDia(clientes);
    

    // Extrai as labels (datas) e os dados (quantidade de clientes)
    const labels = Object.keys(clientesPorDia).sort((a, b) => {
      const dataA = this.parseData(a).getTime();  // Use getTime() para obter o valor numérico da data
      const dataB = this.parseData(b).getTime();  // Use getTime() para obter o valor numérico da data
      return dataA - dataB;  // Agora é seguro fazer a subtração
    });

    const dados = labels.map(label => clientesPorDia[label]);  // Pega os valores em ordem das labels
    

    this.chart = new Chart('canvas', {
      type: 'bar',  // Usamos um gráfico de barras
      data: {
        labels: labels,  // Exibe as datas ordenadas
        datasets: [
          {
            label: 'Quantidade de Clientes por Dia',
            data: dados,  // Exibe a quantidade de clientes cadastrados em cada dia
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2 
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              // Garante que os valores do eixo y sejam inteiros
              callback: function(value) {
                if (Number.isInteger(value)) {
                  return value;  // Apenas exibe valores inteiros
                }
                return null;
              }
            },
            title: {
              display: true,
              text: 'Quantidade de Clientes'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Data de Cadastro'
            }
          }
        }
      }
    });
  }

  // Função para agrupar os clientes por dia de cadastro
  agruparClientesPorDia(clientes: Cliente[]): Record<string, number> {
    const agrupamento: Record<string, number> = {};

    clientes.forEach(cliente => {
      let data: Date;

      // Verifica se o campo dataCadastro é um objeto Date ou um Timestamp do Firestore
      if ((cliente.dataCadastro as any).seconds) {
        // Se for um Firestore Timestamp, converte para Date
        data = new Date((cliente.dataCadastro as any).seconds * 1000);
      } else {
        // Se já for um objeto Date, usa diretamente
        data = new Date(cliente.dataCadastro);
      }

      // Formata a data como 'dd/mm/aaaa'
      const diaFormatado = data.toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
      });

      if (agrupamento[diaFormatado]) {
        agrupamento[diaFormatado] += 1;  // Incrementa o contador se já houver clientes no dia
      } else {
        agrupamento[diaFormatado] = 1;  // Inicia o contador para esse dia
      }
    });

    return agrupamento;
  }

  // Função para converter a string de data 'dd/mm/aaaa' em um objeto Date para ordenação
  parseData(dataString: string): Date {
    const partes = dataString.split('/');
    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10) - 1;  // Meses em JavaScript são base 0
    const ano = parseInt(partes[2], 10);
    return new Date(ano, mes, dia);  // Retorna um objeto Date para ser usado
  }
}
