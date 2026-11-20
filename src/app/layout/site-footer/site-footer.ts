import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Component({
  imports: [],
  selector: 'app-site-footer',
  styleUrl: './site-footer.css',
  templateUrl: './site-footer.html',
})
export class SiteFooter {

  protected readonly storeUrl = environment.storeUrl;
  protected readonly year = new Date().getFullYear();
  protected readonly legalLinks = [
    { label: 'Privacidad', link: '/privacidad'},
    { label: 'Terminos', link: '/terminos'},
    { label: 'Cookies', link: '/cookies'}
  ]

  protected readonly companyLinks = [
    { label: 'Contacto', link: '/contacto'},
    { label: 'About', link: '/nosotros'},
    { label: 'Soporte', link: '/soporte'}
  ];
}
