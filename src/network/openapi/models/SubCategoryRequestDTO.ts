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

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface SubCategoryRequestDTO
 */
export interface SubCategoryRequestDTO {
    /**
     * 
     * @type {string}
     * @memberof SubCategoryRequestDTO
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof SubCategoryRequestDTO
     */
    reference?: string;
}

/**
 * Check if a given object implements the SubCategoryRequestDTO interface.
 */
export function instanceOfSubCategoryRequestDTO(value: object): value is SubCategoryRequestDTO {
    return true;
}

export function SubCategoryRequestDTOFromJSON(json: any): SubCategoryRequestDTO {
    return SubCategoryRequestDTOFromJSONTyped(json, false);
}

export function SubCategoryRequestDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): SubCategoryRequestDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'name': json['name'] == null ? undefined : json['name'],
        'reference': json['reference'] == null ? undefined : json['reference'],
    };
}

export function SubCategoryRequestDTOToJSON(value?: SubCategoryRequestDTO | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'name': value['name'],
        'reference': value['reference'],
    };
}

