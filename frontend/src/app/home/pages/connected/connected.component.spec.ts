import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectedComponent } from './connected.component';

describe('ConnectedComponent', () => {
  let component: ConnectedComponent;
  let fixture: ComponentFixture<ConnectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
