import { Injectable, signal } from '@angular/core';
import { Reservation } from './reservation';

const STORAGE_KEY = 'reservations';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private readonly reservationList = signal<Reservation[]>(loadReservations());

  readonly reservations = this.reservationList.asReadonly();

  // CRUD

  getReservation(id: string): Reservation | undefined {
    return this.reservationList().find((res) => res.id === id);
  }

  addReservation(reservation: Omit<Reservation, 'id'>): void {
    this.reservationList.update((list) => [
      ...list,
      { ...reservation, id: crypto.randomUUID() },
    ]);
    this.saveReservations();
  }

  deleteReservation(id: string): void {
    this.reservationList.update((list) => list.filter((res) => res.id !== id));
    this.saveReservations();
  }

  updateReservation(
    id: string,
    updatedReservation: Omit<Reservation, 'id'>,
  ): void {
    this.reservationList.update((list) =>
      list.map((res) => (res.id === id ? { ...updatedReservation, id } : res)),
    );
    this.saveReservations();
  }

  private saveReservations(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.reservationList()));
  }
}

function loadReservations(): Reservation[] {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}
