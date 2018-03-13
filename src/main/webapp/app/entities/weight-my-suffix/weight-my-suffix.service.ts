import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { WeightMySuffix } from './weight-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class WeightMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/weights';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/weights';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(weight: WeightMySuffix): Observable<WeightMySuffix> {
        const copy = this.convert(weight);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(weight: WeightMySuffix): Observable<WeightMySuffix> {
        const copy = this.convert(weight);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<WeightMySuffix> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to WeightMySuffix.
     */
    private convertItemFromServer(json: any): WeightMySuffix {
        const entity: WeightMySuffix = Object.assign(new WeightMySuffix(), json);
        entity.dateTime = this.dateUtils
            .convertLocalDateFromServer(json.dateTime);
        return entity;
    }

    /**
     * Convert a WeightMySuffix to a JSON which can be sent to the server.
     */
    private convert(weight: WeightMySuffix): WeightMySuffix {
        const copy: WeightMySuffix = Object.assign({}, weight);
        copy.dateTime = this.dateUtils
            .convertLocalDateToServer(weight.dateTime);
        return copy;
    }
}
