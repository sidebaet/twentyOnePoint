import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { FieldsMySuffix } from './fields-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class FieldsMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/fields';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/fields';

    constructor(private http: Http) { }

    create(fields: FieldsMySuffix): Observable<FieldsMySuffix> {
        const copy = this.convert(fields);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(fields: FieldsMySuffix): Observable<FieldsMySuffix> {
        const copy = this.convert(fields);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<FieldsMySuffix> {
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
     * Convert a returned JSON object to FieldsMySuffix.
     */
    private convertItemFromServer(json: any): FieldsMySuffix {
        const entity: FieldsMySuffix = Object.assign(new FieldsMySuffix(), json);
        return entity;
    }

    /**
     * Convert a FieldsMySuffix to a JSON which can be sent to the server.
     */
    private convert(fields: FieldsMySuffix): FieldsMySuffix {
        const copy: FieldsMySuffix = Object.assign({}, fields);
        return copy;
    }
}
