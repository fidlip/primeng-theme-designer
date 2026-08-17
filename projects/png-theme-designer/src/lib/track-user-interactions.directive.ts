import { DestroyRef, Directive, ElementRef, EventEmitter, inject, Input, NgZone, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs/operators';
import { fromEvent, merge } from 'rxjs';

@Directive({ selector: '[pngTrackUserInteractions]', standalone: true })
export class TrackUserInteractionsDirective implements OnInit {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly zone = inject(NgZone);

  @Input() pngDebounce = 300;
  @Input() pngEvents = ['pointerdown', 'keydown', 'wheel', 'input', 'change'];
  @Output() pngInteracted = new EventEmitter<Event>();

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      const streams = this.pngEvents.map(type => fromEvent(this.host.nativeElement, type, { capture: true }));
      merge(...streams)
        .pipe(debounceTime(this.pngDebounce), takeUntilDestroyed(this.destroyRef))
        .subscribe(event => this.zone.run(() => this.pngInteracted.emit(event)));
    });
  }
}
