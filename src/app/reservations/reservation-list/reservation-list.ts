import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReservationService } from '../reservation.service';
import { Reservation } from '../reservation';

@Component({
  selector: 'app-reservation-list',
  imports: [RouterLink, DatePipe],
  templateUrl: './reservation-list.html',
  styleUrl: './reservation-list.css',
})
export class ReservationList {
  private readonly reservationService = inject(ReservationService);

  readonly reservations = this.reservationService.reservations;
  readonly pendingDelete = signal<Reservation | null>(null);

  deleteReservation() {
    const reservation = this.pendingDelete();
    if (reservation) this.reservationService.deleteReservation(reservation.id);
  }
}
