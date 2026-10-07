import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ReservationList } from './reservation-list';

describe('ReservationList', () => {
  let component: ReservationList;
  let fixture: ComponentFixture<ReservationList>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReservationList],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(ReservationList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
