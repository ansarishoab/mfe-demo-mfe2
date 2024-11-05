import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Subscription } from 'rxjs';
/**
 * Service to store and manage session data across the application.
 */

const SHELL_TO_CHILD_EVENT_SD = 'sessionStoreUpdated';
const SHELL_TO_CHILD_SPECIFIC_EVENT_SD = 'sessionDataRequestedFromMfe2';
const CHILD_TO_SHELL_EVENT_SD = 'sessionDataRequested';
const CLEAR_SESSION_EVENT = 'sessionDataClear';

@Injectable({
  providedIn: 'root',
})
export class SessionStoreService {
  private sessionStore = new BehaviorSubject<any>(null);
  sessionStore$ = this.sessionStore.asObservable();
  private sessionChangeEventSubscription: Subscription | undefined;
  private sessionDataRequestedFromCurrentAppSubscription:
    | Subscription
    | undefined;
  private sessionDataClearEventSubscription: Subscription | undefined;

  constructor() {}

  setSessionStore(data: any): void {
    this.sessionStore.next(data);
  }
  clearSession(): void {
    this.sessionStore.next(null);
  }
  getSessionStore(): any {
    return this.sessionStore.getValue();
  }

  // session events registering, unregistering and handling
  addAndDispatchSessionEventListeners(): void {
    this.sessionChangeEventSubscription = fromEvent(
      window,
      SHELL_TO_CHILD_EVENT_SD
    ).subscribe((e: Event) => this.eventHandlerForSessionChange(e));

    this.sessionDataRequestedFromCurrentAppSubscription = fromEvent(
      window,
      SHELL_TO_CHILD_SPECIFIC_EVENT_SD
    ).subscribe((e: Event) => this.eventHandlerForSessionChange(e));

    this.sessionDataClearEventSubscription = fromEvent(
      window,
      CLEAR_SESSION_EVENT
    ).subscribe((e: Event) => this.clearSession());
    /**
     * trigger an event to notify shell app to send the data pass a parameter which will have event name so that
     * shell app will send only to that application which triggered it */
    window.dispatchEvent(
      new CustomEvent(CHILD_TO_SHELL_EVENT_SD, {
        detail: SHELL_TO_CHILD_SPECIFIC_EVENT_SD,
      })
    );
  }

  unregisterSessionEventListeners(): void {
    this.sessionChangeEventSubscription?.unsubscribe();
    this.sessionDataRequestedFromCurrentAppSubscription?.unsubscribe();
    this.sessionDataClearEventSubscription?.unsubscribe();
  }

  eventHandlerForSessionChange(event: Event): void {
    const customEvent = event as CustomEvent;
    this.setSessionStore(customEvent?.detail);
    console.log("logged from mfe2 -> listened an event from shell");
  }
}
