import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import {
  Product,
  products_11,
  products_12,
  products_13,
  products_14,
} from '../model/product.model';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  providers: [DatePipe],
})
export class LandingPageComponent implements OnInit {
  private discountUrl: string = '/discount/FAMILY20';
  private baseUrl: string = 'https://cococasing.se';
  private redirect = '?redirect=';
  private subs: Subscription[] = [];
  index: number = 0;
  nextColor: string = '';
  prevColor: string = '';
  products: Product[] = [];
  product!: Product;
  private buttonUrl!: string;
  series: string = '';
  date: string = '';
  inputDate: number[] = [];

  constructor(private activatedRoute: ActivatedRoute) {
    const arSub = this.activatedRoute.queryParams.subscribe((params) => {
      this.series = params['series'] ?? '11';
      this.date = params['date'];
    });

    if (this.date == undefined) {
      let today = new Date();
      let month = today.getMonth();
      let year = today.getFullYear();
      let day = today.getDate() + 1;
      this.inputDate = [year, month, day];
    } else {
      const temp = this.date.split('-') ?? [];
      this.inputDate = [Number(temp[0]), Number(temp[1]), Number(temp[2])];
    }

    this.subs.push(arSub);
  }

  private setProducts(series: string): void {
    console.log(series);
    switch (series) {
      case '11':
        this.products = products_11;
        break;
      case '12':
        this.products = products_12;
        break;
      case '13':
        this.products = products_13;
        break;
      case '14':
        this.products = products_14;
        break;
      default:
        this.products = products_11;
    }
  }

  ngOnInit(): void {
    this.setProducts(this.series);
    this.product = this.products[this.index];
    this.buttonUrl =
      this.baseUrl +
      this.discountUrl +
      this.redirect +
      this.product.productPageUrl;

    this.setNextColor();
    this.setPrevColor();
  }

  nextProduct(): void {
    if (this.index >= this.products.length - 1) return;
    this.index++;
    this.setProduct();
  }

  previousProduct(): void {
    if (this.index == 0) return;
    this.index--;
    this.setProduct();
  }

  private setProduct(): void {
    this.product = this.products[this.index];
    this.buttonUrl =
      this.baseUrl +
      this.discountUrl +
      this.redirect +
      this.product.productPageUrl;
    this.setNextColor();
    this.setPrevColor();
  }

  private setNextColor(): void {
    this.nextColor =
      this.index < this.products.length - 1
        ? this.products[this.index + 1].productColor
        : 'black';
  }

  private setPrevColor(): void {
    this.prevColor =
      this.index > 0 ? this.products[this.index - 1].productColor : ' black';
  }

  goToProduct(): void {
    window.location.href = this.buttonUrl;
  }
}
