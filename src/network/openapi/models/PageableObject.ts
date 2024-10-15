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
import type { SortObject } from './SortObject';
import {
    SortObjectFromJSON,
    SortObjectFromJSONTyped,
    SortObjectToJSON,
} from './SortObject';

/**
 * 
 * @export
 * @interface PageableObject
 */
export interface PageableObject {
    /**
     * 
     * @type {number}
     * @memberof PageableObject
     */
    offset?: number;
    /**
     * 
     * @type {Array<SortObject>}
     * @memberof PageableObject
     */
    sort?: SortObject;
    /**
     * 
     * @type {number}
     * @memberof PageableObject
     */
    pageSize?: number;
    /**
     * 
     * @type {number}
     * @memberof PageableObject
     */
    pageNumber?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PageableObject
     */
    unpaged?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PageableObject
     */
    paged?: boolean;
}

/**
 * Check if a given object implements the PageableObject interface.
 */
export function instanceOfPageableObject(value: object): value is PageableObject {
    return true;
}

export function PageableObjectFromJSON(json: any): PageableObject {
    return PageableObjectFromJSONTyped(json, false);
}

export function PageableObjectFromJSONTyped(json: any, ignoreDiscriminator: boolean): PageableObject {
    if (json == null) {
        return json;
    }
    return {
        
        'offset': json['offset'] == null ? undefined : json['offset'],
        'sort': json['sort'] == null ? undefined : SortObjectFromJSON(json['sort']),
        'pageSize': json['pageSize'] == null ? undefined : json['pageSize'],
        'pageNumber': json['pageNumber'] == null ? undefined : json['pageNumber'],
        'unpaged': json['unpaged'] == null ? undefined : json['unpaged'],
        'paged': json['paged'] == null ? undefined : json['paged'],
    };
}

export function PageableObjectToJSON(value?: PageableObject | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'offset': value['offset'],
        'sort': value['sort'] == null ? undefined : SortObjectToJSON(value['sort']),
        'pageSize': value['pageSize'],
        'pageNumber': value['pageNumber'],
        'unpaged': value['unpaged'],
        'paged': value['paged'],
    };
}

