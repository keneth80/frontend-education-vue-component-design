import {AxiosResponse} from 'axios';
import {Observable, Observer} from 'rxjs';
import {axiosInstance} from '../../mock';

export interface CustomHttpResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
}

export class HttpClient {
    get(url: string): Observable<CustomHttpResponse> {
        return new Observable((observer: Observer<CustomHttpResponse>) => {
            axiosInstance
                .get(url)
                .then((response: AxiosResponse) => {
                    observer.next({
                        data: response.data,
                        status: response.status,
                        statusText: response.statusText
                    });
                    observer.complete();
                })
                .catch((error) => {
                    observer.error(error);
                });
        });
    }

    post(url: string, param: any): Observable<CustomHttpResponse> {
        return new Observable((observer: Observer<CustomHttpResponse>) => {
            axiosInstance
                .post(url, param)
                .then((response: AxiosResponse) => {
                    observer.next({
                        data: response.data,
                        status: response.status,
                        statusText: response.statusText
                    });
                    observer.complete();
                })
                .catch((error) => {
                    observer.error(error);
                });
        });
    }

    delete(url: string, param: any): Observable<CustomHttpResponse> {
        return new Observable((observer: Observer<CustomHttpResponse>) => {
            axiosInstance
                .delete(url, param)
                .then((response: AxiosResponse) => {
                    observer.next({
                        data: response.data,
                        status: response.status,
                        statusText: response.statusText
                    });
                    observer.complete();
                })
                .catch((error) => {
                    observer.error(error);
                });
        });
    }

    put(url: string, param: any): Observable<CustomHttpResponse> {
        return new Observable((observer: Observer<CustomHttpResponse>) => {
            axiosInstance
                .put(url, param)
                .then((response: AxiosResponse) => {
                    observer.next({
                        data: response.data,
                        status: response.status,
                        statusText: response.statusText
                    });
                    observer.complete();
                })
                .catch((error) => {
                    observer.error(error);
                });
        });
    }
}

export const Http: HttpClient = new HttpClient();
