import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SessionStoreService } from '../services/session-store.service';

@Component({
  selector: 'remote-entry-component',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet> `,
})
export class RemoteEntryComponent implements OnInit, OnDestroy {
  constructor(private sessionStoreService: SessionStoreService) {
    this.sessionStoreService.clearSession();
  }

  ngOnInit(): void {
    this.sessionStoreService.addAndDispatchSessionEventListeners();
    this.sessionStoreService.sessionStore$.subscribe((session) => {
      console.log('logged from mfe2 -> sessionStore is', session);
    });
  }
  ngOnDestroy(): void {
    this.sessionStoreService.unregisterSessionEventListeners();
  }
}
