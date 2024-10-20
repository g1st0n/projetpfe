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
  PageRawMaterialResponseDTO,
  Pageable,
  RawMaterialRequestDTO,
  RawMaterialResponseDTO,
} from '../models/index';
import {
    PageRawMaterialResponseDTOFromJSON,
    PageRawMaterialResponseDTOToJSON,
    PageableFromJSON,
    PageableToJSON,
    RawMaterialRequestDTOFromJSON,
    RawMaterialRequestDTOToJSON,
    RawMaterialResponseDTOFromJSON,
    RawMaterialResponseDTOToJSON,
} from '../models/index';

export interface CreateRawMaterialRequest {
    rawMaterialRequestDTO: RawMaterialRequestDTO;
}

export interface DeleteRawMaterialRequest {
    idMaterial: number;
}

export interface GeneratePdf2Request {
    rawMaterialId: number;
}

export interface GetAllRawMaterialsRequest {
    pageable: Pageable;
}

export interface GetRawMaterialByIdRequest {
    idMaterial: number;
}

export interface UpdateRawMaterialRequest {
    rawMaterialRequestDTO: RawMaterialRequestDTO;
}

/**
 * 
 */
export class RawMaterialControllerApi extends runtime.BaseAPI {

    /**
     */
    async createRawMaterialRaw(requestParameters: CreateRawMaterialRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RawMaterialResponseDTO>> {
        if (requestParameters['rawMaterialRequestDTO'] == null) {
            throw new runtime.RequiredError(
                'rawMaterialRequestDTO',
                'Required parameter "rawMaterialRequestDTO" was null or undefined when calling createRawMaterial().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/raw-materials/add`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: RawMaterialRequestDTOToJSON(requestParameters['rawMaterialRequestDTO']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RawMaterialResponseDTOFromJSON(jsonValue));
    }

    /**
     */
    async createRawMaterial(requestParameters: CreateRawMaterialRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RawMaterialResponseDTO> {
        const response = await this.createRawMaterialRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async deleteRawMaterialRaw(requestParameters: DeleteRawMaterialRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['idMaterial'] == null) {
            throw new runtime.RequiredError(
                'idMaterial',
                'Required parameter "idMaterial" was null or undefined when calling deleteRawMaterial().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/raw-materials/{idMaterial}`.replace(`{${"idMaterial"}}`, encodeURIComponent(String(requestParameters['idMaterial']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async deleteRawMaterial(requestParameters: DeleteRawMaterialRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteRawMaterialRaw(requestParameters, initOverrides);
    }

    /**
     */
    async generatePdf2Raw(requestParameters: GeneratePdf2Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters['rawMaterialId'] == null) {
            throw new runtime.RequiredError(
                'rawMaterialId',
                'Required parameter "rawMaterialId" was null or undefined when calling generatePdf2().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/raw-materials/generate/{rawMaterialId}`.replace(`{${"rawMaterialId"}}`, encodeURIComponent(String(requestParameters['rawMaterialId']))),
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
    async generatePdf2(requestParameters: GeneratePdf2Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.generatePdf2Raw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getAllRawMaterialsRaw(requestParameters: GetAllRawMaterialsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PageRawMaterialResponseDTO>> {
        if (requestParameters['pageable'] == null) {
            throw new runtime.RequiredError(
                'pageable',
                'Required parameter "pageable" was null or undefined when calling getAllRawMaterials().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['pageable'] != null) {
            queryParameters['pageable'] = requestParameters['pageable'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/raw-materials`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PageRawMaterialResponseDTOFromJSON(jsonValue));
    }

    /**
     */
    async getAllRawMaterials(requestParameters: GetAllRawMaterialsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PageRawMaterialResponseDTO> {
        const response = await this.getAllRawMaterialsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getAllRawMaterials1Raw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<RawMaterialResponseDTO>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/raw-materials/showAll`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(RawMaterialResponseDTOFromJSON));
    }

    /**
     */
    async getAllRawMaterials1(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<RawMaterialResponseDTO>> {
        const response = await this.getAllRawMaterials1Raw(initOverrides);
        return await response.value();
    }

    /**
     */
    async getRawMaterialByIdRaw(requestParameters: GetRawMaterialByIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RawMaterialResponseDTO>> {
        if (requestParameters['idMaterial'] == null) {
            throw new runtime.RequiredError(
                'idMaterial',
                'Required parameter "idMaterial" was null or undefined when calling getRawMaterialById().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/raw-materials/{idMaterial}`.replace(`{${"idMaterial"}}`, encodeURIComponent(String(requestParameters['idMaterial']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RawMaterialResponseDTOFromJSON(jsonValue));
    }

    /**
     */
    async getRawMaterialById(requestParameters: GetRawMaterialByIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RawMaterialResponseDTO> {
        const response = await this.getRawMaterialByIdRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async updateRawMaterialRaw(requestParameters: UpdateRawMaterialRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RawMaterialResponseDTO>> {
        if (requestParameters['rawMaterialRequestDTO'] == null) {
            throw new runtime.RequiredError(
                'rawMaterialRequestDTO',
                'Required parameter "rawMaterialRequestDTO" was null or undefined when calling updateRawMaterial().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/raw-materials/{idMaterial}`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: RawMaterialRequestDTOToJSON(requestParameters['rawMaterialRequestDTO']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RawMaterialResponseDTOFromJSON(jsonValue));
    }

    /**
     */
    async updateRawMaterial(requestParameters: UpdateRawMaterialRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RawMaterialResponseDTO> {
        const response = await this.updateRawMaterialRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
