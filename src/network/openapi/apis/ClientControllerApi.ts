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
  ClientRequestDTO,
  ClientResponseDTO,
  PageClientResponseDTO,
  Pageable,
} from '../models/index';
import {
    ClientRequestDTOFromJSON,
    ClientRequestDTOToJSON,
    ClientResponseDTOFromJSON,
    ClientResponseDTOToJSON,
    PageClientResponseDTOFromJSON,
    PageClientResponseDTOToJSON,
    PageableFromJSON,
    PageableToJSON,
} from '../models/index';

export interface CreateClientRequest {
    clientRequestDTO: ClientRequestDTO;
}

export interface DeleteClientRequest {
    id: number;
}

export interface GeneratePdf7Request {
    clientId: number;
}

export interface GetAllClientsRequest {
    pageable: Pageable;
}

export interface UpdateClient1Request {
    clientRequestDTO: ClientRequestDTO;
}

/**
 * 
 */
export class ClientControllerApi extends runtime.BaseAPI {

    /**
     */
    async createClientRaw(requestParameters: CreateClientRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ClientResponseDTO>> {
        if (requestParameters['clientRequestDTO'] == null) {
            throw new runtime.RequiredError(
                'clientRequestDTO',
                'Required parameter "clientRequestDTO" was null or undefined when calling createClient().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/clients/add`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ClientRequestDTOToJSON(requestParameters['clientRequestDTO']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ClientResponseDTOFromJSON(jsonValue));
    }

    /**
     */
    async createClient(requestParameters: CreateClientRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ClientResponseDTO> {
        const response = await this.createClientRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async deleteClientRaw(requestParameters: DeleteClientRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling deleteClient().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/clients/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async deleteClient(requestParameters: DeleteClientRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteClientRaw(requestParameters, initOverrides);
    }

    /**
     */
    async generatePdf7Raw(requestParameters: GeneratePdf7Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters['clientId'] == null) {
            throw new runtime.RequiredError(
                'clientId',
                'Required parameter "clientId" was null or undefined when calling generatePdf7().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/clients/generate/{clientId}`.replace(`{${"clientId"}}`, encodeURIComponent(String(requestParameters['clientId']))),
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
    async generatePdf7(requestParameters: GeneratePdf7Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.generatePdf7Raw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async generatePdf7Raw(requestParameters: GeneratePdf7Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters['clientId'] == null) {
            throw new runtime.RequiredError(
                'clientId',
                'Required parameter "clientId" was null or undefined when calling generatePdf7().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/clients/generate/{clientId}`.replace(`{${"clientId"}}`, encodeURIComponent(String(requestParameters['clientId']))),
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
    async generatePdf7(requestParameters: GeneratePdf7Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.generatePdf7Raw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getAllClientsRaw(requestParameters: GetAllClientsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PageClientResponseDTO>> {
        if (requestParameters['pageable'] == null) {
            throw new runtime.RequiredError(
                'pageable',
                'Required parameter "pageable" was null or undefined when calling getAllClients().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['pageable'] != null) {
            queryParameters['pageable'] = requestParameters['pageable'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/clients`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PageClientResponseDTOFromJSON(jsonValue));
    }

    /**
     */
    async getAllClients(requestParameters: GetAllClientsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PageClientResponseDTO> {
        const response = await this.getAllClientsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getAllClients1Raw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<ClientResponseDTO>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/clients/showAll`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ClientResponseDTOFromJSON));
    }

    /**
     */
    async getAllClients1(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<ClientResponseDTO>> {
        const response = await this.getAllClients1Raw(initOverrides);
        return await response.value();
    }

    /**
     */
    async updateClient1Raw(requestParameters: UpdateClient1Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ClientResponseDTO>> {
        if (requestParameters['clientRequestDTO'] == null) {
            throw new runtime.RequiredError(
                'clientRequestDTO',
                'Required parameter "clientRequestDTO" was null or undefined when calling updateClient1().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/clients/{id}`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: ClientRequestDTOToJSON(requestParameters['clientRequestDTO']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ClientResponseDTOFromJSON(jsonValue));
    }

    /**
     */
    async updateClient1(requestParameters: UpdateClient1Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ClientResponseDTO> {
        const response = await this.updateClient1Raw(requestParameters, initOverrides);
        return await response.value();
    }

}
