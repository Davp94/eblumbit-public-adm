import { Component, input } from '@angular/core';
import { Promotion } from '../../../../core/models/Promotion';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-promotions-section',
  styleUrl: './promotions-section.css',
  templateUrl: './promotions-section.html',
})
export class PromotionsSection {
  readonly promotions = input.required<Promotion[]>();
  protected readonly storeUrl = environment.storeUrl;
}
