import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { BloodPressureMySuffix } from './blood-pressure-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class BloodPressureMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/blood-pressures';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/blood-pressures';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(bloodPressure: BloodPressureMySuffix): Observable<BloodPressureMySuffix> {
        const copy = this.convert(bloodPressure);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(bloodPressure: BloodPressureMySuffix): Observable<BloodPressureMySuffix> {
        const copy = this.convert(bloodPressure);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<BloodPressureMySuffix> {
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
     * Convert a returned JSON object to BloodPressureMySuffix.
     */
    private convertItemFromServer(json: any): BloodPressureMySuffix {
        const entity: BloodPressureMySuffix = Object.assign(new BloodPressureMySuffix(), json);
        entity.dateTime = this.dateUtils
            .convertLocalDateFromServer(json.dateTime);
        return entity;
    }

    /**
     * Convert a BloodPressureMySuffix to a JSON which can be sent to the server.
     */
    private convert(bloodPressure: BloodPressureMySuffix): BloodPressureMySuffix {
        const copy: BloodPressureMySuffix = Object.assign({}, bloodPressure);
        copy.dateTime = this.dateUtils
            .convertLocalDateToServer(bloodPressure.dateTime);
        return copy;
    }
}
