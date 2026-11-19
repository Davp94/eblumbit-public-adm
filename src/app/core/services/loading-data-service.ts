import { inject, Service, signal } from '@angular/core';
import { addDoc, collection, collectionData, Firestore, orderBy, query, where } from '@angular/fire/firestore';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, tap } from 'rxjs';
import { MessagePayload } from '../models/MessagePayload';

@Service()
export class LoadingDataService {

    private readonly firestore = inject(Firestore);
    readonly loadingCatalog = signal<boolean>(true);
    readonly catalogError = signal<string | null>(null);

    readonly carouselSlides = toSignal(
        collectionData(
            query(
                collection(this.firestore, 'carouselSlides'),
                where('active', '==', true),
                orderBy('order', 'asc')
            ),
            {idField: 'id'}
        ).pipe(
            tap(() => {
                this.loadingCatalog.set(false);
                this.catalogError.set(null);
            }),
            catchError((err) => {
                console.log('Error cargando carrousel', err);
                this.loadingCatalog.set(false);
                this.catalogError.set('No se pueron cargar los slides')
                return of([])
            })
        ),
        { initialValue: [] }
    );

    readonly promotions = toSignal(
        collectionData(
            query(
                collection(this.firestore, 'promotions'),
                where('state', '==', true),
                orderBy('order', 'asc')
            ),
            { idField: 'id' }
        ).pipe(
            catchError((err) => {
                console.log('Error cargando promociones', err);
                return of([])
            })
        ),
        { initialValue: [] }
    );

    async sendMessage(payload: MessagePayload) {
        const messagesRef = collection(this.firestore, 'contactMessages');
        await addDoc(messagesRef, {
            ...payload,
            createdAt: new Date()
        })
    }
}
