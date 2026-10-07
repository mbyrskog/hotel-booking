import { TestBed } from '@angular/core/testing';

import { ReservationService } from './reservation.service';
import { Reservation } from './reservation';

describe('ReservationService', () => {
  let service: ReservationService;

  function makeReservation(guestName: string): Omit<Reservation, 'id'> {
    return {
      checkInDate: '2026-10-07',
      checkOutDate: '2026-10-09',
      guestName,
      guestEmail: `${guestName.toLowerCase()}@example.com`,
      roomNumber: 12,
    };
  }

  function createService(): ReservationService {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    return TestBed.inject(ReservationService);
  }

  beforeEach(() => {
    localStorage.removeItem('reservations');
    service = createService();
  });

  afterEach(() => {
    localStorage.removeItem('reservations');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a reservation with a unique id and save it', () => {
    service.addReservation(makeReservation('Anna'));
    service.addReservation(makeReservation('Bo'));

    const [first, second] = service.reservations();
    expect(first.id).toBeTruthy();
    expect(first.id).not.toEqual(second.id);
    expect(JSON.parse(localStorage.getItem('reservations')!).length).toBe(2);
  });

  it('should load saved reservations on startup', () => {
    service.addReservation(makeReservation('Anna'));

    const reloaded = createService();
    expect(reloaded.reservations().map((r) => r.guestName)).toEqual(['Anna']);
  });

  it('should start empty when saved data is corrupt', () => {
    localStorage.setItem('reservations', '{not json');
    expect(createService().reservations()).toEqual([]);

    localStorage.setItem('reservations', '{"id": "1"}');
    expect(createService().reservations()).toEqual([]);
  });

  it('should delete the reservation with the given id', () => {
    service.addReservation(makeReservation('Anna'));
    service.addReservation(makeReservation('Bo'));
    const annaId = service.reservations()[0].id;

    service.deleteReservation(annaId);

    expect(service.reservations().map((r) => r.guestName)).toEqual(['Bo']);
  });

  it('should not delete anything when the id is unknown', () => {
    service.addReservation(makeReservation('Anna'));
    service.addReservation(makeReservation('Bo'));

    service.deleteReservation('unknown');

    expect(service.reservations().length).toBe(2);
  });

  it('should update the reservation with the given id and keep its id', () => {
    service.addReservation(makeReservation('Anna'));
    const id = service.reservations()[0].id;

    service.updateReservation(id, makeReservation('Anna Updated'));

    expect(service.getReservation(id)?.guestName).toBe('Anna Updated');
    expect(service.reservations().length).toBe(1);
  });

  it('should not change anything when updating an unknown id', () => {
    service.addReservation(makeReservation('Anna'));

    service.updateReservation('unknown', makeReservation('Ghost'));

    expect(service.reservations().map((r) => r.guestName)).toEqual(['Anna']);
    expect(service.reservations().length).toBe(1);
  });
});
