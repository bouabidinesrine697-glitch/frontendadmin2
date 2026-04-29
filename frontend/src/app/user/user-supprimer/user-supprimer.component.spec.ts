import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSupprimerComponent } from './user-supprimer.component';

describe('UserSupprimerComponent', () => {
  let component: UserSupprimerComponent;
  let fixture: ComponentFixture<UserSupprimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserSupprimerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserSupprimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
