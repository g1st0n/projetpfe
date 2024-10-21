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
import type { UserResponseDTO } from './UserResponseDTO';
import {
    UserResponseDTOFromJSON,
    UserResponseDTOFromJSONTyped,
    UserResponseDTOToJSON,
} from './UserResponseDTO';
import type { SortObject } from './SortObject';
import {
    SortObjectFromJSON,
    SortObjectFromJSONTyped,
    SortObjectToJSON,
} from './SortObject';

/**
 * 
 * @export
 * @interface PageUserResponseDTO
 */
export interface PageUserResponseDTO {
    /**
     * 
     * @type {number}
     * @memberof PageUserResponseDTO
     */
    totalElements?: number;
    /**
     * 
     * @type {number}
     * @memberof PageUserResponseDTO
     */
    totalPages?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PageUserResponseDTO
     */
    first?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PageUserResponseDTO
     */
    last?: boolean;
    /**
     * 
     * @type {number}
     * @memberof PageUserResponseDTO
     */
    size?: number;
    /**
     * 
     * @type {Array<UserResponseDTO>}
     * @memberof PageUserResponseDTO
     */
    content?: Array<UserResponseDTO>;
    /**
     * 
     * @type {number}
     * @memberof PageUserResponseDTO
     */
    number?: number;
    /**
     * 
     * @type {Array<SortObject>}
     * @memberof PageUserResponseDTO
     */
    sort?: Array<SortObject>;
    /**
     * 
     * @type {number}
     * @memberof PageUserResponseDTO
     */
    numberOfElements?: number;
    /**
     * 
     * @type {PageableObject}
     * @memberof PageUserResponseDTO
     */
    pageable?: PageableObject;
    /**
     * 
     * @type {boolean}
     * @memberof PageUserResponseDTO
     */
    empty?: boolean;
}

/**
 * Check if a given object implements the PageUserResponseDTO interface.
 */
export function instanceOfPageUserResponseDTO(value: object): value is PageUserResponseDTO {
    return true;
}

export function PageUserResponseDTOFromJSON(json: any): PageUserResponseDTO {
    return PageUserResponseDTOFromJSONTyped(json, false);
}

export function PageUserResponseDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): PageUserResponseDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'totalElements': json['totalElements'] == null ? undefined : json['totalElements'],
        'totalPages': json['totalPages'] == null ? undefined : json['totalPages'],
        'first': json['first'] == null ? undefined : json['first'],
        'last': json['last'] == null ? undefined : json['last'],
        'size': json['size'] == null ? undefined : json['size'],
        'content': json['content'] == null ? undefined : ((json['content'] as Array<any>).map(UserResponseDTOFromJSON)),
        'number': json['number'] == null ? undefined : json['number'],
        'sort': Array.isArray(json['sort']) ? json['sort'].map(SortObjectFromJSON) : [SortObjectFromJSON(json['sort'])], 
        'numberOfElements': json['numberOfElements'] == null ? undefined : json['numberOfElements'],
        'pageable': json['pageable'] == null ? undefined : PageableObjectFromJSON(json['pageable']),
        'empty': json['empty'] == null ? undefined : json['empty'],
    };
}

export function PageUserResponseDTOToJSON(value?: PageUserResponseDTO | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'totalElements': value['totalElements'],
        'totalPages': value['totalPages'],
        'first': value['first'],
        'last': value['last'],
        'size': value['size'],
        'content': value['content'] == null ? undefined : ((value['content'] as Array<any>).map(UserResponseDTOToJSON)),
        'number': value['number'],
        'sort': value['sort'] == null ? undefined : ((value['sort'] as Array<any>).map(SortObjectToJSON)),
        'numberOfElements': value['numberOfElements'],
        'pageable': PageableObjectToJSON(value['pageable']),
        'empty': value['empty'],
    };
}
