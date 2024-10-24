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
import type { SortObject } from './SortObject';
import {
    SortObjectFromJSON,
    SortObjectFromJSONTyped,
    SortObjectToJSON,
} from './SortObject';
import type { WorkshopResponseDTO } from './WorkshopResponseDTO';
import {
    WorkshopResponseDTOFromJSON,
    WorkshopResponseDTOFromJSONTyped,
    WorkshopResponseDTOToJSON,
} from './WorkshopResponseDTO';

/**
 * 
 * @export
 * @interface PageWorkshopResponseDTO
 */
export interface PageWorkshopResponseDTO {
    /**
     * 
     * @type {number}
     * @memberof PageWorkshopResponseDTO
     */
    totalElements?: number;
    /**
     * 
     * @type {number}
     * @memberof PageWorkshopResponseDTO
     */
    totalPages?: number;
    /**
     * 
     * @type {number}
     * @memberof PageWorkshopResponseDTO
     */
    size?: number;
    /**
     * 
     * @type {Array<WorkshopResponseDTO>}
     * @memberof PageWorkshopResponseDTO
     */
    content?: Array<WorkshopResponseDTO>;
    /**
     * 
     * @type {number}
     * @memberof PageWorkshopResponseDTO
     */
    number?: number;
    /**
     * 
     * @type {Array<SortObject>}
     * @memberof PageWorkshopResponseDTO
     */
    sort?: Array<SortObject>;
    /**
     * 
     * @type {boolean}
     * @memberof PageWorkshopResponseDTO
     */
    first?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PageWorkshopResponseDTO
     */
    last?: boolean;
    /**
     * 
     * @type {number}
     * @memberof PageWorkshopResponseDTO
     */
    numberOfElements?: number;
    /**
     * 
     * @type {PageableObject}
     * @memberof PageWorkshopResponseDTO
     */
    pageable?: PageableObject;
    /**
     * 
     * @type {boolean}
     * @memberof PageWorkshopResponseDTO
     */
    empty?: boolean;
}

/**
 * Check if a given object implements the PageWorkshopResponseDTO interface.
 */
export function instanceOfPageWorkshopResponseDTO(value: object): value is PageWorkshopResponseDTO {
    return true;
}

export function PageWorkshopResponseDTOFromJSON(json: any): PageWorkshopResponseDTO {
    return PageWorkshopResponseDTOFromJSONTyped(json, false);
}

export function PageWorkshopResponseDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): PageWorkshopResponseDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'totalElements': json['totalElements'] == null ? undefined : json['totalElements'],
        'totalPages': json['totalPages'] == null ? undefined : json['totalPages'],
        'size': json['size'] == null ? undefined : json['size'],
        'content': json['content'] == null ? undefined : ((json['content'] as Array<any>).map(WorkshopResponseDTOFromJSON)),
        'number': json['number'] == null ? undefined : json['number'],

        'sort': Array.isArray(json['sort']) ? json['sort'].map(SortObjectFromJSON) : [SortObjectFromJSON(json['sort'])],        
        'first': json['first'] == null ? undefined : json['first'],
        'last': json['last'] == null ? undefined : json['last'],
        'numberOfElements': json['numberOfElements'] == null ? undefined : json['numberOfElements'],
        'pageable': json['pageable'] == null ? undefined : PageableObjectFromJSON(json['pageable']),
        'empty': json['empty'] == null ? undefined : json['empty'],
    };
}

export function PageWorkshopResponseDTOToJSON(value?: PageWorkshopResponseDTO | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'totalElements': value['totalElements'],
        'totalPages': value['totalPages'],
        'size': value['size'],
        'content': value['content'] == null ? undefined : ((value['content'] as Array<any>).map(WorkshopResponseDTOToJSON)),
        'number': value['number'],
        'sort': value['sort'] == null ? undefined : ((value['sort'] as Array<any>).map(SortObjectToJSON)),
        'first': value['first'],
        'last': value['last'],
        'numberOfElements': value['numberOfElements'],
        'pageable': PageableObjectToJSON(value['pageable']),
        'empty': value['empty'],
    };
}

