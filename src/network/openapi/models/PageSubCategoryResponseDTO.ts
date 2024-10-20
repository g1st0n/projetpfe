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
import type { PageableObject } from './PageableObject';
import {
    PageableObjectFromJSON,
    PageableObjectFromJSONTyped,
    PageableObjectToJSON,
} from './PageableObject';
import type { SubCategoryResponseDTO } from './SubCategoryResponseDTO';
import {
    SubCategoryResponseDTOFromJSON,
    SubCategoryResponseDTOFromJSONTyped,
    SubCategoryResponseDTOToJSON,
} from './SubCategoryResponseDTO';
import type { SortObject } from './SortObject';
import {
    SortObjectFromJSON,
    SortObjectFromJSONTyped,
    SortObjectToJSON,
} from './SortObject';

/**
 * 
 * @export
 * @interface PageSubCategoryResponseDTO
 */
export interface PageSubCategoryResponseDTO {
    /**
     * 
     * @type {number}
     * @memberof PageSubCategoryResponseDTO
     */
    totalPages?: number;
    /**
     * 
     * @type {number}
     * @memberof PageSubCategoryResponseDTO
     */
    totalElements?: number;
    /**
     * 
     * @type {number}
     * @memberof PageSubCategoryResponseDTO
     */
    size?: number;
    /**
     * 
     * @type {Array<SubCategoryResponseDTO>}
     * @memberof PageSubCategoryResponseDTO
     */
    content?: Array<SubCategoryResponseDTO>;
    /**
     * 
     * @type {number}
     * @memberof PageSubCategoryResponseDTO
     */
    number?: number;
    /**
     * 
     * @type {Array<SortObject>}
     * @memberof PageSubCategoryResponseDTO
     */
    sort?: Array<SortObject>;
    /**
     * 
     * @type {number}
     * @memberof PageSubCategoryResponseDTO
     */
    numberOfElements?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PageSubCategoryResponseDTO
     */
    first?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PageSubCategoryResponseDTO
     */
    last?: boolean;
    /**
     * 
     * @type {PageableObject}
     * @memberof PageSubCategoryResponseDTO
     */
    pageable?: PageableObject;
    /**
     * 
     * @type {boolean}
     * @memberof PageSubCategoryResponseDTO
     */
    empty?: boolean;
}

/**
 * Check if a given object implements the PageSubCategoryResponseDTO interface.
 */
export function instanceOfPageSubCategoryResponseDTO(value: object): value is PageSubCategoryResponseDTO {
    return true;
}

export function PageSubCategoryResponseDTOFromJSON(json: any): PageSubCategoryResponseDTO {
    return PageSubCategoryResponseDTOFromJSONTyped(json, false);
}

export function PageSubCategoryResponseDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): PageSubCategoryResponseDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'totalPages': json['totalPages'] == null ? undefined : json['totalPages'],
        'totalElements': json['totalElements'] == null ? undefined : json['totalElements'],
        'size': json['size'] == null ? undefined : json['size'],
        'content': json['content'] == null ? undefined : ((json['content'] as Array<any>).map(SubCategoryResponseDTOFromJSON)),
        'number': json['number'] == null ? undefined : json['number'],
'sort': Array.isArray(json['sort']) 
            ? json['sort'].map(SortObjectFromJSON) 
            : json['sort'] != null && typeof json['sort'] === 'object'
                ? [SortObjectFromJSON(json['sort'])] // Wrap the object in an array
                : [],        'numberOfElements': json['numberOfElements'] == null ? undefined : json['numberOfElements'],
        'first': json['first'] == null ? undefined : json['first'],
        'last': json['last'] == null ? undefined : json['last'],
        'pageable': json['pageable'] == null ? undefined : PageableObjectFromJSON(json['pageable']),
        'empty': json['empty'] == null ? undefined : json['empty'],
    };
}

export function PageSubCategoryResponseDTOToJSON(value?: PageSubCategoryResponseDTO | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'totalPages': value['totalPages'],
        'totalElements': value['totalElements'],
        'size': value['size'],
        'content': value['content'] == null ? undefined : ((value['content'] as Array<any>).map(SubCategoryResponseDTOToJSON)),
        'number': value['number'],
        'sort': value['sort'] == null ? undefined : ((value['sort'] as Array<any>).map(SortObjectToJSON)),
        'numberOfElements': value['numberOfElements'],
        'first': value['first'],
        'last': value['last'],
        'pageable': PageableObjectToJSON(value['pageable']),
        'empty': value['empty'],
    };
}

