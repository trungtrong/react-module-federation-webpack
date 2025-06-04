import { Subject } from 'rxjs';

type EventCallback<T> = (data: T) => void;

interface IEventBus {
    doesEventNameExist(eventName: string): void;
    on(params: { eventName: string }): void;
    getSubject<T>(params: { eventName: string }): Subject<T> | undefined;
    subscribe<T>(params: { eventName: string; callback: EventCallback<T>; turnOffAfterClosed?: boolean }): { unsubscribe: () => void };
    emit<T>(params: { eventName: string, data: T }): void;
    clearEvent(params: { eventName: string; }): void;
    clear(): void;
}

class EventBusEmitter implements IEventBus {
    private observers: Map<string, Subject<unknown> | undefined>;

    constructor() {
        this.observers = new Map();
    }

    doesEventNameExist(eventName: string) {
        const doesExist = this.observers.has(eventName);
        if (!doesExist) {
            console.warn(`This event bus name ${eventName} doesn't exist`);
        }
        return doesExist;
    }

    on(params: { eventName: string }) {
        if (this.doesEventNameExist(params.eventName)) {
            return;
        }
        //
        this.observers.set(params.eventName, new Subject());
    }

    getSubject<T>(params: { eventName: string }): Subject<T> | undefined {
        if (!this.doesEventNameExist(params.eventName)) {
            return undefined;
        }
        //
        return this.observers.get(params.eventName) as Subject<T>;
    }

    subscribe<T>(params: { eventName: string; callback: EventCallback<T>; clearAfterUnsubscribed?: boolean }): { unsubscribe: () => void } {
        if (!this.doesEventNameExist(params.eventName)) {
            return { unsubscribe: () => { } };
        }
        //
        const subject$ = this.observers.get(params.eventName);
        if (!subject$ || subject$.closed) {
            return { unsubscribe: () => { } };
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const subscription = subject$?.subscribe(params.callback);

        // return an unsubscribe Subscription
        const unsubscribe = () => {
            subscription.unsubscribe();
            if (params.clearAfterUnsubscribed) {
                this.clearEvent({ eventName: params.eventName });
            }
        }
        return { unsubscribe };
    }


    emit<T>(params: { eventName: string, data: T }) {
        if (!this.doesEventNameExist(params.eventName)) {
            return;
        }
        //
        const subject$ = this.observers.get(params.eventName);
        if (!subject$ || subject$.closed) {
            return;
        }
        //
        subject$.next(params.data);
    }

    clearEvent(params: { eventName: string; }) {
        if (!this.doesEventNameExist(params.eventName)) {
            return;
        }

        const subject = this.observers.get(params.eventName);
        subject?.unsubscribe();
        this.observers.delete(params.eventName);
    }

    clear() {
        if (!this.observers.size) {
            return;
        }
        //
        const allSubjects$ = this.observers.values();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (allSubjects$ as Array).forEach((subject: Subject<unknown>) => {
            subject.unsubscribe();
        })
        this.observers.clear();
    }
}

const eventBus = new EventBusEmitter();
export default eventBus;
