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
  SubCategoryRequestDTO,
  SubCategoryResponseDTO,
} from '../models/index';
import {
    SubCategoryRequestDTOFromJSON,
    SubCategoryRequestDTOToJSON,
    SubCategoryResponseDTOFromJSON,
    SubCategoryResponseDTOToJSON,
} from '../models/index';

export interface CreateSubCategoryRequest {
    subCategoryRequestDTO: SubCategoryRequestDTO;
}

export interface DeleteSubCategoryRequest {
    id: number;
}

export interface GetSubCategoryByIdRequest {
    id: number;
}

export interface UpdateSubCategoryRequest {
    id: number;
    subCategoryRequestDTO: SubCategoryRequestDTO;
}

/**
 * 
 */
export class SubCategoryControllerApi extends runtime.BaseAPI {

    /**
     */
    async createSubCategoryRaw(requestParameters: CreateSubCategoryRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SubCategoryResponseDTO>> {
        if (requestParameters['subCategoryRequestDTO'] == null) {
            throw new runtime.RequiredError(
                'subCategoryRequestDTO',
                'Required parameter "subCategoryRequestDTO" was null or undefined when calling createSubCategory().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/subcategories/add`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: SubCategoryRequestDTOToJSON(requestParameters['subCategoryRequestDTO']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SubCategoryResponseDTOFromJSON(jsonValue));
    }

    /**
     */
    async createSubCategory(requestParameters: CreateSubCategoryRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SubCategoryResponseDTO> {
        const response = await this.createSubCategoryRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async deleteSubCategoryRaw(requestParameters: DeleteSubCategoryRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling deleteSubCategory().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/subcategories/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async deleteSubCategory(requestParameters: DeleteSubCategoryRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteSubCategoryRaw(requestParameters, initOverrides);
    }

    /**
     */
    async getAllSubCategoriesRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<SubCategoryResponseDTO>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/subcategories`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(SubCategoryResponseDTOFromJSON));
    }

    /**
     */
    async getAllSubCategories(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<SubCategoryResponseDTO>> {
        const response = await this.getAllSubCategoriesRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async getSubCategoryByIdRaw(requestParameters: GetSubCategoryByIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SubCategoryResponseDTO>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling getSubCategoryById().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/subcategories/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SubCategoryResponseDTOFromJSON(jsonValue));
    }

    /**
     */
    async getSubCategoryById(requestParameters: GetSubCategoryByIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SubCategoryResponseDTO> {
        const response = await this.getSubCategoryByIdRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async updateSubCategoryRaw(requestParameters: UpdateSubCategoryRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SubCategoryResponseDTO>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling updateSubCategory().'
            );
        }

        if (requestParameters['subCategoryRequestDTO'] == null) {
            throw new runtime.RequiredError(
                'subCategoryRequestDTO',
                'Required parameter "subCategoryRequestDTO" was null or undefined when calling updateSubCategory().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/subcategories/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: SubCategoryRequestDTOToJSON(requestParameters['subCategoryRequestDTO']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SubCategoryResponseDTOFromJSON(jsonValue));
    }

    /**
     */
    async updateSubCategory(requestParameters: UpdateSubCategoryRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SubCategoryResponseDTO> {
        const response = await this.updateSubCategoryRaw(requestParameters, initOverrides);
        return await response.value();
    }

}