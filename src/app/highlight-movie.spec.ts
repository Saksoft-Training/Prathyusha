import { HighlightMovie } from './highlight-movie';
import { ElementRef, Renderer2 } from '@angular/core';

describe('HighlightMovie', () => {
  let mockEl: ElementRef;
  let mockRenderer: Renderer2;

  beforeEach(() => {
    // Mock ElementRef
    mockEl = new ElementRef(document.createElement('div'));

    // Mock Renderer2 with only the methods we need
    mockRenderer = {
      setStyle: jasmine.createSpy('setStyle'),
      // add any other Renderer2 methods used in your directive
    } as unknown as Renderer2;
  });
  it('should create an instance', () => {
    const directive = new HighlightMovie(mockEl, mockRenderer);
    expect(directive).toBeTruthy();
  });
});