import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoadingDataService } from '../../../../core/services/loading-data-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-contact-section',
  styleUrl: './contact-section.css',
  templateUrl: './contact-section.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactSection {
  private readonly data = inject(LoadingDataService);

  protected readonly submitting = signal(false);
  protected readonly successMessage = signal<string | null>(null);
  protected readonly errorMessage = signal<string | null>(null);

  protected readonly branches = [
    {
      name: 'Sucursal Central',
      address: 'Av. Principal 1234, Edificio Empresarial, Piso 10, Ciudad Capital.',
      mapUrl: 'https://maps.google.com/?q=Av.+Principal+1234',
    },
    {
      name: 'Sucursal Norte',
      address: 'Calle de los Olivos 456, Centro Comercial San Isidro.',
      mapUrl: 'https://maps.google.com/?q=Calle+de+los+Olivos+456',
    },
  ];

  protected readonly form = inject(FormBuilder).nonNullable.group({
    fullName: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
    message: ['', [Validators.required, Validators.maxLength(2000)]],
  });

  protected async submit(): Promise<void> {
    this.successMessage.set(null);
    this.errorMessage.set(null);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    try {
      await this.data.sendMessage({
        ...this.form.getRawValue(),
        createdAt: new Date(),
      });
      this.form.reset();
      this.successMessage.set('Gracias por escribirnos. Nos pondremos en contacto contigo pronto.');
    } catch (error) {
      console.error('No se pudo enviar el mensaje de contacto.', error);
      this.errorMessage.set('No pudimos enviar tu mensaje. Inténtalo de nuevo más tarde.');
    } finally {
      this.submitting.set(false);
    }
  }
}
