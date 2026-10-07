import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ReservationForm } from './reservation-form';

describe('ReservationForm', () => {
  let component: ReservationForm;
  let fixture: ComponentFixture<ReservationForm>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReservationForm],
      providers: [provideRouter([])],
    });

    fixture = TestBed.createComponent(ReservationForm);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', '123');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reject a check-out date that is not after check-in', () => {
    const form = component.reservationForm;

    form.patchValue({ checkInDate: '2026-10-09', checkOutDate: '2026-10-07' });
    expect(form.hasError('checkOutBeforeCheckIn')).toBe(true);

    form.patchValue({ checkOutDate: '2026-10-09' });
    expect(form.hasError('checkOutBeforeCheckIn')).toBe(true);

    form.patchValue({ checkOutDate: '2026-10-10' });
    expect(form.hasError('checkOutBeforeCheckIn')).toBe(false);
  });
});
