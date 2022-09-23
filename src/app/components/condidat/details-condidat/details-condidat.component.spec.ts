import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCondidatComponent } from './details-condidat.component';

describe('DetailsCondidatComponent', () => {
  let component: DetailsCondidatComponent;
  let fixture: ComponentFixture<DetailsCondidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsCondidatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCondidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
