import { Component, computed, input, signal } from '@angular/core';
import { CarouselSlide } from '../../../../core/models/CarouselSlide';
import { environment } from '../../../../../environments/environment.development';

@Component({
  imports: [],
  selector: 'app-hero-carrousel',
  styleUrl: './hero-carrousel.css',
  templateUrl: './hero-carrousel.html',
})
export class HeroCarrousel {
  readonly slides = input.required<CarouselSlide[]>();

  protected readonly index = signal(0);
  protected readonly total = computed(() => this.slides().length);
  protected readonly activeSlide = computed(() => this.slides()[this.index()] ?? null);
  protected readonly storeUrl = environment.storeUrl;

  protected showSlide(index: number): void {
    const total = this.total();
    if (total > 0) {
      this.index.set((index + total) % total);
    }
  }

  protected previous(): void {
    this.showSlide(this.index() - 1);
  }

  protected next(): void {
    this.showSlide(this.index() + 1);
  }
}
