import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordPaletteComponent } from './word-palette.component';

describe('WordPaletteComponent', () => {
  let component: WordPaletteComponent;
  let fixture: ComponentFixture<WordPaletteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordPaletteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
