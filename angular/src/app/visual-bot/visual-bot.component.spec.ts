import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualBotComponent } from './visual-bot.component';

describe('VisualBotComponent', () => {
  let component: VisualBotComponent;
  let fixture: ComponentFixture<VisualBotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisualBotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisualBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
