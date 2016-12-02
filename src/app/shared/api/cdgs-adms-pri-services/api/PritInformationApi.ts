/**
 * 
 * No descripton provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.2
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

import {Http, Headers, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import {Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as models from '../model/models';
import 'rxjs/Rx';

/* tslint:disable:no-unused-variable member-ordering */

'use strict';

@Injectable()
export class PritInformationApi {
    protected basePath = '/api/pri';
    public defaultHeaders : Headers = new Headers();

    constructor(protected http: Http, @Optional() basePath: string) {
        if (basePath) {
            this.basePath = basePath;
        }
    }

    /**
     * PriBussinessSpec.addProjectInformation
     * สำหรับการบันทึกข้อมูลรายละเอียดโครงการ
     * @param body 
     */
    public addProjectInformation (body?: models.ProjectInformationBean, extraHttpRequestParams?: any ) : Observable<models.PritInformation> {
        const path = this.basePath + '/pritInformation';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = JSON.stringify(body);

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * PriBussinessSpec.editProjectInformation
     * สำหรับการแก้ไขข้อมูลรายละเอียดโครงการ
     * @param body 
     */
    public editProjectInformation (body?: models.ProjectInformationEditBean, extraHttpRequestParams?: any ) : Observable<models.ProjectInformationEditBean> {
        const path = this.basePath + '/pritInformation';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        let requestOptions: RequestOptionsArgs = {
            method: 'PUT',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = JSON.stringify(body);

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * PriBussinessSpec.getProjectInformationByRef
     * สำหรับการค้นหาตารางข้อมูลรายละเอียดโครงการ ตาม Primary Key
     * @param projRef 
     */
    public getProjectInformationByRef (projRef: number, extraHttpRequestParams?: any ) : Observable<models.PritInformation> {
        const path = this.basePath + '/pritInformation/projRef/{projRef}'
            .replace('{' + 'projRef' + '}', String(projRef));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'projRef' is not null or undefined
        if (projRef === null || projRef === undefined) {
            throw new Error('Required parameter projRef was null or undefined when calling getProjectInformationByRef.');
        }
        let requestOptions: RequestOptionsArgs = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * PriBussinessSpec.getProjectInformationListByCondition
     * สำหรับการค้นหาตารางข้อมูลรายละเอียดโครงการ
     * @param start 
     * @param size 
     * @param projCode 
     * @param projYear 
     * @param projOrgCode 
     * @param projType 
     * @param projName 
     * @param projStatus 
     */
    public getProjectInformationListByCondition (start?: number, size?: number, projCode?: string, projYear?: number, projOrgCode?: string, projType?: string, projName?: string, projStatus?: string, extraHttpRequestParams?: any ) : Observable<Array<models.ProjectInformationInfoBean>> {
        const path = this.basePath + '/pritInformation';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        if (start !== undefined) {
            queryParameters.set('start', String(start));
        }

        if (size !== undefined) {
            queryParameters.set('size', String(size));
        }

        if (projCode !== undefined) {
            queryParameters.set('projCode', String(projCode));
        }

        if (projYear !== undefined) {
            queryParameters.set('projYear', String(projYear));
        }

        if (projOrgCode !== undefined) {
            queryParameters.set('projOrgCode', String(projOrgCode));
        }

        if (projType !== undefined) {
            queryParameters.set('projType', String(projType));
        }

        if (projName !== undefined) {
            queryParameters.set('projName', String(projName));
        }

        if (projStatus !== undefined) {
            queryParameters.set('projStatus', String(projStatus));
        }

        let requestOptions: RequestOptionsArgs = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * PriBussinessSpec.removeProjectInformationByRef
     * สำหรับการลบข้อมูลรายละเอียดโครงการ ตาม Primary Key
     * @param projRef 
     */
    public removeProjectInformationByRef (projRef: number, extraHttpRequestParams?: any ) : Observable<{}> {
        const path = this.basePath + '/pritInformation/{projRef}'
            .replace('{' + 'projRef' + '}', String(projRef));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'projRef' is not null or undefined
        if (projRef === null || projRef === undefined) {
            throw new Error('Required parameter projRef was null or undefined when calling removeProjectInformationByRef.');
        }
        let requestOptions: RequestOptionsArgs = {
            method: 'DELETE',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * PriBussinessSpec.removeProjectInformationList
     * สำหรับการลบข้อมูลรายละเอียดโครงการ
     * @param body 
     */
    public removeProjectInformationList (body?: Array<number>, extraHttpRequestParams?: any ) : Observable<{}> {
        const path = this.basePath + '/pritInformation';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        let requestOptions: RequestOptionsArgs = {
            method: 'DELETE',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = JSON.stringify(body);

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

}
