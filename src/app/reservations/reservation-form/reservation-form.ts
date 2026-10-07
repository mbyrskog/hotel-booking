import { Component, OnInit, computed, inject, input } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'app-reservation-form',
  imports: [ReactiveFormsModule],
  templateUrl: './reservation-form.html',
})
export class ReservationForm implements OnInit {
  private readonly formBuilder = inject(FormBuilder).nonNullable;
  private readonly reservationService = inject(ReservationService);
  private readonly router = inject(Router);

  readonly id = input<string>();

  private readonly existingReservation = computed(() => {
    const id = this.id();
    return id ? this.reservationService.getReservation(id) : undefined;
  });

  readonly isEditMode = computed(() => !!this.existingReservation());

  readonly reservationForm = this.formBuilder.group(
    {
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: this.formBuilder.control<number | null>(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(100),
      ]),
    },
    { validators: checkOutAfterCheckIn },
  );

  ngOnInit(): void {
    const reservation = this.existingReservation();
    if (reservation) this.reservationForm.patchValue(reservation);
  }

  onSubmit() {
    if (this.reservationForm.invalid) return;

    const { roomNumber, ...rest } = this.reservationForm.getRawValue();
    const reservation = { ...rest, roomNumber: roomNumber! };

    const id = this.id();

    if (id && this.isEditMode()) {
      // Update
      this.reservationService.updateReservation(id, reservation);
    } else {
      // New
      this.reservationService.addReservation(reservation);
    }

    this.router.navigate(['/list']);
  }
}

function checkOutAfterCheckIn(group: AbstractControl): ValidationErrors | null {
  const checkIn = group.get('checkInDate')?.value;
  const checkOut = group.get('checkOutDate')?.value;

  return checkIn && checkOut && checkOut <= checkIn
    ? { checkOutBeforeCheckIn: true }
    : null;
}
