import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Header } from './header';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display the correct title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain(
      'Hotel Reservation Portal',
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
