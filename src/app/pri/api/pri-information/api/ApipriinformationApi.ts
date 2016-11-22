/**
 * 
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Inject, Injectable, Optional } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { RequestMethod, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Response, ResponseContentType } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as models from '../model/models';
import { BASE_PATH } from '../variables';
import { Configuration } from '../configuration';

/* tslint:disable:no-unused-variable member-ordering */


@Injectable()
export class ApipriinformationApi {
    protected basePath = '/resources';
    // protected basePath = 'http://localhost:7080/adms-pri-1.0-SNAPSHOT/resources';
    public defaultHeaders: Headers = new Headers();
    public configuration: Configuration = new Configuration();

    constructor(protected http: Http, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
        }
    }

    /**
     * create a new pritInformation
     * Create a new pritInformation
     * @param body 
     */
    public createPritInformation(body?: models.PritInformation, extraHttpRequestParams?: any): Observable<{}> {
        return this.createPritInformationWithHttpInfo(body, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * get The Customer From ProjCode
     * 
     * @param projCode 
     */
    public getAllPritCustomersByProjCode(projCode: string, extraHttpRequestParams?: any): Observable<{}> {
        return this.getAllPritCustomersByProjCodeWithHttpInfo(projCode, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * get all the pritInformations
     * 
     */
    public getAllPritInformations(extraHttpRequestParams?: any): Observable<{}> {
        return this.getAllPritInformationsWithHttpInfo(extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * get the pritInformation
     * 
     * @param projRef 
     */
    public getPritInformation(projRef: number, extraHttpRequestParams?: any): Observable<{}> {
        return this.getPritInformationWithHttpInfo(projRef, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * remove the pritInformation
     * 
     * @param projRef 
     */
    public removePritInformation(projRef: number, extraHttpRequestParams?: any): Observable<string> {
        return this.removePritInformationWithHttpInfo(projRef, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return 'ลบข้อมูลเสร็จสิ้น';
                }
            });
    }

    /**
     * update pritInformation
     * Updates an existing pritInformation
     * @param body 
     */
    public updatePritInformation(body?: models.PritInformation, extraHttpRequestParams?: any): Observable<{}> {
        return this.updatePritInformationWithHttpInfo(body, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }


    /**
     * create a new pritInformation
     * Create a new pritInformation
     * @param body 
     */
    public createPritInformationWithHttpInfo(body?: models.PritInformation, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + `/api/pri/information`;

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845


        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        // to determine the Accept header
        let produces: string[] = [
        ];



        headers.set('Content-Type', 'application/json');


        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers,
            body: body == null ? '' : JSON.stringify(body), // https://github.com/angular/angular/issues/10612
            search: queryParameters,
            responseType: ResponseContentType.Json
        });

        return this.http.request(path, requestOptions);
    }

    /**
     * get The Customer From ProjCode
     * 
     * @param projCode 
     */
    public getAllPritCustomersByProjCodeWithHttpInfo(projCode: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + `/api/pri/information/${projCode}/customer`;

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'projCode' is not null or undefined
        if (projCode === null || projCode === undefined) {
            throw new Error('Required parameter projCode was null or undefined when calling getAllPritCustomersByProjCode.');
        }


        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        // to determine the Accept header
        let produces: string[] = [
        ];





        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters,
            responseType: ResponseContentType.Json
        });

        return this.http.request(path, requestOptions);
    }

    /**
     * get all the pritInformations
     * 
     */
    public getAllPritInformationsWithHttpInfo(extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + `/api/pri/information`;

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845


        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        // to determine the Accept header
        let produces: string[] = [
        ];





        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters,
            responseType: ResponseContentType.Json
        });

        return this.http.request(path, requestOptions);
    }

    /**
     * get the pritInformation
     * 
     * @param projRef 
     */
    public getPritInformationWithHttpInfo(projRef: number, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + `/api/pri/information/${projRef}`;

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'projRef' is not null or undefined
        if (projRef === null || projRef === undefined) {
            throw new Error('Required parameter projRef was null or undefined when calling getPritInformation.');
        }


        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        // to determine the Accept header
        let produces: string[] = [
        ];





        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters,
            responseType: ResponseContentType.Json
        });

        return this.http.request(path, requestOptions);
    }

    /**
     * remove the pritInformation
     * 
     * @param projRef 
     */
    public removePritInformationWithHttpInfo(projRef: number, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + `/api/pri/information/${projRef}`;
        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'projRef' is not null or undefined
        if (projRef === null || projRef === undefined) {
            throw new Error('Required parameter projRef was null or undefined when calling removePritInformation.');
        }


        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        // to determine the Accept header
        let produces: string[] = [
        ];





        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Delete,
            headers: headers,
            search: queryParameters,
            responseType: ResponseContentType.Json
        });

        return this.http.request(path, requestOptions);
    }

    /**
     * update pritInformation
     * Updates an existing pritInformation
     * @param body 
     */
    public updatePritInformationWithHttpInfo(body?: models.PritInformation, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + `/api/pri/information`;

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845


        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        // to determine the Accept header
        let produces: string[] = [
        ];



        headers.set('Content-Type', 'application/json');


        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Put,
            headers: headers,
            body: body == null ? '' : JSON.stringify(body), // https://github.com/angular/angular/issues/10612
            search: queryParameters,
            responseType: ResponseContentType.Json
        });

        return this.http.request(path, requestOptions);
    }

}
