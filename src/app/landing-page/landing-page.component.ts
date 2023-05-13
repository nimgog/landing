import { Component, OnInit } from '@angular/core';

export interface Product {
  productImageUrl: string;
  productPageUrl: string;
  landingPageBackgroundClass: string;
  landingPageSubtitle: string;
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  // https://cococasing.se/discount/FAMILY20?redirect=/products/test-the-coco-package // FORMAT
  private discountUrl: string = '/discount/FAMILY20'
  private baseUrl: string = 'https://cococasing.se'
  products: Product[] = [
    {
      landingPageBackgroundClass: 'page-container--orange-gradient',
      landingPageSubtitle: 'for Your Active Lifestyle',
      productImageUrl: 'assets/img/product_orange.webp',
      productPageUrl: '/products/the-coco-package-iphone-11-sunset-orange',
    },
    {
      landingPageBackgroundClass: 'page-container--orange-gradient',
      landingPageSubtitle: 'for Your Active Lifestyle',
      productImageUrl: 'assets/img/product_orange.webp',
      productPageUrl: '/products/the-coco-package-iphone-11-french-lavender',
    },
  ];
  product: Product = this.products[0];

  constructor() {}

  ngOnInit(): void {}
}
