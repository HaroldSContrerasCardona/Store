import { Component, Input, SimpleChanges, inject, signal } from '@angular/core';
import { ProductComponent } from '@products/components/product/product.component';
import { CommonModule } from '@angular/common';
import { Product } from '@shared/models/product.model';
import { HeaderComponent } from '@shared/components/header/header.component';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { Category } from '@shared/models/category.model';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent, HeaderComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  //cart = signal<Product[]>([]);
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  @Input() category_id?: string;


  ngOnInit(){
    this.getCategories();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getProducts();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  private getProducts(){
    this.productService.getProducts(this.category_id)
    .subscribe({
      next: (products) => {
        console.log('get', products)
        this.products.set(products);
      },
      error: () => {

      }
    })
  }

  private getCategories(){
    this.categoryService.getAll()
    .subscribe({
      next: (data) => {
        console.log('get', this.categories)
        this.categories.set(data);
      },
      error: () => {

      }
    })
  }

  constructor(){
    // const initProducts: Product[] = [
    //   {
    //     id: Date.now(),
    //     title: 'Pro 1',
    //     price: 100,
    //     image: 'https://picsum.photos/640/640?r=23',
    //     creationAt: new Date().toISOString()
    //   },
    //   {
    //     id: Date.now(),
    //     title: 'Pro 2',
    //     price: 200,
    //     image: 'https://picsum.photos/640/640?r=13',
    //     creationAt: new Date().toISOString()
    //   },
    //   {
    //     id: Date.now(),
    //     title: 'Pro 3',
    //     price: 300,
    //     image: 'https://picsum.photos/640/640?r=33',
    //     creationAt: new Date().toISOString()
    //   },
    //   {
    //     id: Date.now(),
    //     title: 'Pro 4',
    //     price: 400,
    //     image: 'https://picsum.photos/640/640?r=43',
    //     creationAt: new Date().toISOString()
    //   },
    //   {
    //     id: Date.now(),
    //     title: 'Pro 5',
    //     price: 500,
    //     image: 'https://picsum.photos/640/640?r=53',
    //     creationAt: new Date().toISOString()
    //   },
    //   {
    //     id: Date.now(),
    //     title: 'Pro 6',
    //     price: 600,
    //     image: 'https://picsum.photos/640/640?r=63',
    //     creationAt: new Date().toISOString()
    //   }
    // ];
    // this.products.set(initProducts);
  }
}
