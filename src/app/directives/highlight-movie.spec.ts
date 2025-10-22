import { HighlightMovie } from './highlight-movie';
import { ElementRef, Renderer2 } from '@angular/core';

describe('HighlightMovie', () => {
  let mockEl: ElementRef;
  let mockRenderer: Renderer2;

  beforeEach(() => {
    mockEl = new ElementRef(document.createElement('div'));

    mockRenderer = {
      setStyle: jasmine.createSpy('setStyle'),
    } as unknown as Renderer2;
  });
  it('should create an instance', () => {
    const directive = new HighlightMovie(mockEl, mockRenderer);
    expect(directive).toBeTruthy();
  });
});