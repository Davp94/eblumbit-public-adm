import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-site-header',
  styleUrl: './site-header.css',
  templateUrl: './site-header.html',
})
export class SiteHeader {
  protected readonly storeUrl = environment.storeUrl;
  protected readonly links = [
    { label: 'Inicio', fragment: 'inicio' as const },
    { label: 'Promociones', fragment: 'promociones' as const },
    { label: 'Contacto', fragment: 'contacto' as const },
  ]
}
