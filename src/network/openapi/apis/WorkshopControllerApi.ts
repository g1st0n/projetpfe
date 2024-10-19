/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  WorkshopRequestDTO,
  WorkshopResponseDTO,
} from '../models/index';
import {
    WorkshopRequestDTOFromJSON,
    WorkshopRequestDTOToJSON,
    WorkshopResponseDTOFromJSON,
    WorkshopResponseDTOToJSON,
} from '../models/index';

export interface CreateWorkshopRequest {
    workshopRequestDTO: WorkshopRequestDTO;
}

export interface DeleteWorkshopRequest {
    idWorkshop: number;
}

export interface GeneratePdfRequest {
    workshopId: number;
}

export interface GetWorkshopByIdRequest {
    idWorkshop: number;
}

export interface UpdateWorkshopRequest {
    idWorkshop: number;
    workshopRequestDTO: WorkshopRequestDTO;
}

/**
 * 
 */
export class WorkshopControllerApi extends runtime.BaseAPI {

    /**
     */
    async createWorkshopRaw(requestParameters: CreateWorkshopRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<WorkshopResponseDTO>> {
        if (requestParameters['workshopRequestDTO'] == null) {
            throw new runtime.RequiredError(
                'workshopRequestDTO',
                'Required parameter "workshopRequestDTO" was null or undefined when calling createWorkshop().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/workshops/add`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: WorkshopRequestDTOToJSON(requestParameters['workshopRequestDTO']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => WorkshopResponseDTOFromJSON(jsonValue));
    }

    /**
     */
    async createWorkshop(requestParameters: CreateWorkshopRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<WorkshopResponseDTO> {
        const response = await this.createWorkshopRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async deleteWorkshopRaw(requestParameters: DeleteWorkshopRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['idWorkshop'] == null) {
            throw new runtime.RequiredError(
                'idWorkshop',
                'Required parameter "idWorkshop" was null or undefined when calling deleteWorkshop().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/workshops/{idWorkshop}`.replace(`{${"idWorkshop"}}`, encodeURIComponent(String(requestParameters['idWorkshop']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async deleteWorkshop(requestParameters: DeleteWorkshopRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteWorkshopRaw(requestParameters, initOverrides);
    }

    /**
     */
    async generatePdfRaw(requestParameters: GeneratePdfRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters['workshopId'] == null) {
            throw new runtime.RequiredError(
                'workshopId',
                'Required parameter "workshopId" was null or undefined when calling generatePdf().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/workshops/generate/{workshopId}`.replace(`{${"workshopId"}}`, encodeURIComponent(String(requestParameters['workshopId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<string>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     */
    async generatePdf(requestParameters: GeneratePdfRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.generatePdfRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getAllWorkshopsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<WorkshopResponseDTO>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/workshops`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(WorkshopResponseDTOFromJSON));
    }

    /**
     */
    async getAllWorkshops(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<WorkshopResponseDTO>> {
        const response = await this.getAllWorkshopsRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async getWorkshopByIdRaw(requestParameters: GetWorkshopByIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<WorkshopResponseDTO>> {
        if (requestParameters['idWorkshop'] == null) {
            throw new runtime.RequiredError(
                'idWorkshop',
                'Required parameter "idWorkshop" was null or undefined when calling getWorkshopById().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/workshops/{idWorkshop}`.replace(`{${"idWorkshop"}}`, encodeURIComponent(String(requestParameters['idWorkshop']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => WorkshopResponseDTOFromJSON(jsonValue));
    }

    /**
     */
    async getWorkshopById(requestParameters: GetWorkshopByIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<WorkshopResponseDTO> {
        const response = await this.getWorkshopByIdRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async updateWorkshopRaw(requestParameters: UpdateWorkshopRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<WorkshopResponseDTO>> {
        if (requestParameters['idWorkshop'] == null) {
            throw new runtime.RequiredError(
                'idWorkshop',
                'Required parameter "idWorkshop" was null or undefined when calling updateWorkshop().'
            );
        }

        if (requestParameters['workshopRequestDTO'] == null) {
            throw new runtime.RequiredError(
                'workshopRequestDTO',
                'Required parameter "workshopRequestDTO" was null or undefined when calling updateWorkshop().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/workshops/{idWorkshop}`.replace(`{${"idWorkshop"}}`, encodeURIComponent(String(requestParameters['idWorkshop']))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: WorkshopRequestDTOToJSON(requestParameters['workshopRequestDTO']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => WorkshopResponseDTOFromJSON(jsonValue));
    }

    /**
     */
    async updateWorkshop(requestParameters: UpdateWorkshopRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<WorkshopResponseDTO> {
        const response = await this.updateWorkshopRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
