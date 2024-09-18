import { Component, inject, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms'; //hay que importar esta dependencia para que jale :/
import { Shoes } from '../../models/shoes';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    FormsModule
  ]
})
export class DashboardComponent implements OnInit {
  branchesArray: Shoes[] = [
    {
      id: 123456,
      name: 'Tenis deportivos',
      size: 28.5,
      brand: 'Nike',
      price: 1200,
      branches: ["Tuxtla","Teran","San Cristobal"]
    }
  ];

  nuevoZapato: Shoes = {
    id: 0,
    name: '',
    size: 0,
    brand: '',
    price: 0,
    branches: []
  };

  sucursalesString: string = '';

  ngOnInit(): void {
    console.log(this.branchesArray);
  }

  agregarZapato() {
    //con el metodo split se puede separar cada elemento con coma
    const sucursales = this.sucursalesString.split(',').map(sucursal => sucursal.trim());
    
    this.nuevoZapato.branches = sucursales;
    this.branchesArray.push({ ...this.nuevoZapato });

    this.nuevoZapato = { id: 0, name: '', size: 0, brand: '', price: 0, branches: [] };
    this.sucursalesString = '';
  }

  private breakpointObserver = inject(BreakpointObserver);
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }
      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );
}
