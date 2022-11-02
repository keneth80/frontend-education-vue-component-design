import {Observable, Observer, delay} from 'rxjs';

export const setTimeoutOpt = (callback: any, delayTime = 500) => {
    const timeout = new Observable((observer: Observer<any>) => {
        observer.next(true);
        observer.complete();
    })
        .pipe(delay(delayTime))
        .subscribe(() => {
            callback();
        });
    return timeout;
};
