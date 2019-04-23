import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectedPageComponent } from './connected-page.component';

describe('ConnectedPageComponent', () => {
  let component: ConnectedPageComponent;
  let fixture: ComponentFixture<ConnectedPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectedPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
