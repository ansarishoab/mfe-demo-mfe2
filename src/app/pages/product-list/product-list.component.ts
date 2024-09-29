import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  media: string;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.less',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  ngOnInit(): void {
    this.products = [
      {
        id: 1,
        name: 'Product 1',
        price: 10,
        description: 'Description 1',
        media: 'https://m.media-amazon.com/images/I/81D+bCgn8hL._AC_SX679_.jpg',
      },
      {
        id: 2,
        name: 'Product 2',
        price: 20,
        description: 'Description 2',
        media: 'https://m.media-amazon.com/images/I/81D+bCgn8hL._AC_SX679_.jpg',
      },
      {
        id: 3,
        name: 'Product 3',
        price: 30,
        description: 'Description 3',
        media: 'https://m.media-amazon.com/images/I/81D+bCgn8hL._AC_SX679_.jpg',
      },
    ];
  }
}
