import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface Product {
  productImageUrl: string;
  productPageUrl: string;
  landingPageBackgroundClass: string;
  landingPageSubtitle: string;
  productColor: string;
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {

  private discountUrl: string = '/discount/FAMILY20'
  private baseUrl: string = 'https://cococasing.se'
  private redirect = '?redirect=';
  index: number = 0;
  nextColor: string = ''
  prevColor: string = ''
  products: Product[] = [
    {
      landingPageBackgroundClass: 'page-container--orange-gradient',
      landingPageSubtitle: 'for Your Active Lifestyle',
      productImageUrl: 'assets/img/product_orange.webp',
      productPageUrl: '/products/the-coco-package-iphone-11-sunset-orange',
      productColor: '#ff9c5a'
    },
    {
      landingPageBackgroundClass: 'page-container--lavender-gradient',
      landingPageSubtitle: 'for Your Wellbeing & Comfort',
      productImageUrl: 'assets/img/product_lavender.webp',
      productPageUrl: '/products/the-coco-package-iphone-11-french-lavender',
      productColor: '#c2c6e6'
    },
  ];
  product: Product = this.products[this.index];
  private buttonUrl: string

  constructor(private router: Router) {
    this.buttonUrl = this.baseUrl + this.discountUrl + this.redirect + this.product.productPageUrl
  }

  nextProduct(): void {
    if(this.index >= this.products.length - 1) return;
    this.index++;
    this.setProduct();
  }

  previousProduct(): void {
    if(this.index == 0) return;
    this.index--;
    this.setProduct();
  }

  setProduct(): void {
    this.product = this.products[this.index];
    this.buttonUrl = this.baseUrl + this.discountUrl + this.redirect + this.product.productPageUrl
    if(this.index >= this.products.length -1) {
      this.nextColor = 'black'
    } else {
      this.nextColor = this.products[this.index+1].productColor
    }
    if(this.index === 0) {
      this.prevColor = 'black'
    } else {
      this.prevColor = this.products[this.index-1].productColor
    }
  }

  goToProduct(): void {
    window.location.href = this.buttonUrl
  }

  ngOnInit(): void {}
}
