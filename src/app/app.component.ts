import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Unidade = {
  nome: string;
  fator: number;
};

type Categoria = {
  nome: string;
  unidades: Unidade[];
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="conversor-container">
      <h1>Conversor de Unidades</h1>

      <div class="seletores">
        <div class="seletor">
          <label for="categoria">Categoria:</label>
          <select id="categoria" [(ngModel)]="categoriaSelecionada" (change)="onCategoriaChange()">
            <option *ngFor="let categoria of categorias" [ngValue]="categoria">{{categoria.nome}}</option>
          </select>
        </div>

        <div class="seletor">
          <label for="unidadeOrigem">De:</label>
          <select id="unidadeOrigem" [(ngModel)]="unidadeOrigem" (change)="converter()">
            <option *ngFor="let unidade of categoriaSelecionada.unidades" [ngValue]="unidade">{{unidade.nome}}</option>
          </select>
        </div>

        <div class="seletor">
          <label for="unidadeDestino">Para:</label>
          <select id="unidadeDestino" [(ngModel)]="unidadeDestino" (change)="converter()">
            <option *ngFor="let unidade of categoriaSelecionada.unidades" [ngValue]="unidade">{{unidade.nome}}</option>
          </select>
        </div>
      </div>

      <div class="valores">
        <div class="valor-input">
          <input type="number" [(ngModel)]="valorOrigem" (input)="converter()">
          <span>{{unidadeOrigem.nome}}</span>
        </div>

        <div class="igual">=</div>

        <div class="valor-resultado">
          <span>{{valorConvertido | number:'1.2-4'}}</span>
          <span>{{unidadeDestino.nome}}</span>
        </div>
      </div>
    </div>
  `,
  styles: [],
})

export class AppComponent {
  categorias: Categoria[] = [
    {
      nome: 'Comprimento',
      unidades: [
        { nome: 'Milímetros', fator: 0.001 },
        { nome: 'Centímetros', fator: 0.01 },
        { nome: 'Metros', fator: 1 },
        { nome: 'Quilômetros', fator: 1000 },
        { nome: 'Polegadas', fator: 0.0254 },
        { nome: 'Pés', fator: 0.3048 },
        { nome: 'Jardas', fator: 0.9144 },
        { nome: 'Milhas', fator: 1609.34 }
      ]
    },
    {
      nome: 'Peso',
      unidades: [
        { nome: 'Miligramas', fator: 0.001 },
        { nome: 'Gramas', fator: 1 },
        { nome: 'Quilogramas', fator: 1000 },
        { nome: 'Toneladas', fator: 1000000 },
        { nome: 'Onças', fator: 28.3495 },
        { nome: 'Libras', fator: 453.592 }
      ]
    },
    {
      nome: 'Temperatura',
      unidades: [
        { nome: 'Celsius', fator: 1 },
        { nome: 'Fahrenheit', fator: 1 },
        { nome: 'Kelvin', fator: 1 }
      ]
    }
  ];

  categoriaSelecionada: Categoria = this.categorias[0];
  unidadeOrigem = this.categoriaSelecionada.unidades[0];
  unidadeDestino = this.categoriaSelecionada.unidades[1];
  valorOrigem = 1;
  valorConvertido = 0;

  converter(): void {
    if (this.categoriaSelecionada.nome === 'Temperatura') {
      this.converterTemperatura();
    } else {
      this.converterUnidadesPadrao();
    }
  }

  private converterUnidadesPadrao(): void {
    this.valorConvertido = (this.valorOrigem * this.unidadeOrigem.fator) / this.unidadeDestino.fator;
  }

  private converterTemperatura(): void {
    const valor = this.valorOrigem;
    
    if (this.unidadeOrigem.nome === 'Celsius') {
      if (this.unidadeDestino.nome === 'Fahrenheit') {
        this.valorConvertido = (valor * 9/5) + 32;
      } else if (this.unidadeDestino.nome === 'Kelvin') {
        this.valorConvertido = valor + 273.15;
      } else {
        this.valorConvertido = valor;
      }
    } else if (this.unidadeOrigem.nome === 'Fahrenheit') {
      if (this.unidadeDestino.nome === 'Celsius') {
        this.valorConvertido = (valor - 32) * 5/9;
      } else if (this.unidadeDestino.nome === 'Kelvin') {
        this.valorConvertido = (valor - 32) * 5/9 + 273.15;
      } else {
        this.valorConvertido = valor;
      }
    } else if (this.unidadeOrigem.nome === 'Kelvin') {
      if (this.unidadeDestino.nome === 'Celsius') {
        this.valorConvertido = valor - 273.15;
      } else if (this.unidadeDestino.nome === 'Fahrenheit') {
        this.valorConvertido = (valor - 273.15) * 9/5 + 32;
      } else {
        this.valorConvertido = valor;
      }
    }
  }

  onCategoriaChange(): void {
    // Reset para as primeiras unidades da nova categoria
    this.unidadeOrigem = this.categoriaSelecionada.unidades[0];
    this.unidadeDestino = this.categoriaSelecionada.unidades[1];
    this.converter();
  }
}
