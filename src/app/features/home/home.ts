import { Component, inject } from '@angular/core';
import { HeroCarrousel } from './components/hero-carrousel/hero-carrousel';
import { ContactSection } from './components/contact-section/contact-section';
import { PromotionsSection } from './components/promotions-section/promotions-section';
import { LoadingDataService } from '../../core/services/loading-data-service';

@Component({
  imports: [HeroCarrousel, ContactSection, PromotionsSection],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  private readonly data = inject(LoadingDataService);

  protected readonly slides = this.data.carouselSlides;
  protected readonly promotions = this.data.promotions;

}
