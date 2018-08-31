import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchlistIncomingComponent } from './matchlist-incoming.component';

describe('MatchlistIncomingComponent', () => {
  let component: MatchlistIncomingComponent;
  let fixture: ComponentFixture<MatchlistIncomingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchlistIncomingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchlistIncomingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
