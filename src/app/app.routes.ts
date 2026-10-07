import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home').then((m) => m.Home),
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./reservations/reservation-list/reservation-list').then(
        (m) => m.ReservationList,
      ),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./reservations/reservation-form/reservation-form').then(
        (m) => m.ReservationForm,
      ),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./reservations/reservation-form/reservation-form').then(
        (m) => m.ReservationForm,
      ),
  },
];
