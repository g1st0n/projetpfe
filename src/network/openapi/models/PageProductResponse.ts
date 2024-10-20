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
import type { ProductResponse } from './ProductResponse';
import {
    ProductResponseFromJSON,
    ProductResponseFromJSONTyped,
    ProductResponseToJSON,
} from './ProductResponse';

/**
 * 
 * @export
 * @interface PageProductResponse
 */
export interface PageProductResponse {
    /**
     * 
     * @type {number}
     * @memberof PageProductResponse
     */
    totalPages?: number;
    /**
     * 
     * @type {number}
     * @memberof PageProductResponse
     */
    totalElements?: number;
    /**
     * 
     * @type {number}
     * @memberof PageProductResponse
     */
    size?: number;
    /**
     * 
     * @type {Array<ProductResponse>}
     * @memberof PageProductResponse
     */
    content?: Array<ProductResponse>;
    /**
     * 
     * @type {number}
     * @memberof PageProductResponse
     */
    number?: number;
    /**
     * 
     * @type {Array<SortObject>}
     * @memberof PageProductResponse
     */
    sort?: Array<SortObject>;
    /**
     * 
     * @type {number}
     * @memberof PageProductResponse
     */
    numberOfElements?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PageProductResponse
     */
    first?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PageProductResponse
     */
    last?: boolean;
    /**
     * 
     * @type {PageableObject}
     * @memberof PageProductResponse
     */
    pageable?: PageableObject;
    /**
     * 
     * @type {boolean}
     * @memberof PageProductResponse
     */
    empty?: boolean;
}

/**
 * Check if a given object implements the PageProductResponse interface.
 */
export function instanceOfPageProductResponse(value: object): value is PageProductResponse {
    return true;
}

export function PageProductResponseFromJSON(json: any): PageProductResponse {
    return PageProductResponseFromJSONTyped(json, false);
}

export function PageProductResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): PageProductResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'totalPages': json['totalPages'] == null ? undefined : json['totalPages'],
        'totalElements': json['totalElements'] == null ? undefined : json['totalElements'],
        'size': json['size'] == null ? undefined : json['size'],
        'content': json['content'] == null ? undefined : ((json['content'] as Array<any>).map(ProductResponseFromJSON)),
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

export function PageProductResponseToJSON(value?: PageProductResponse | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'totalPages': value['totalPages'],
        'totalElements': value['totalElements'],
        'size': value['size'],
        'content': value['content'] == null ? undefined : ((value['content'] as Array<any>).map(ProductResponseToJSON)),
        'number': value['number'],
        'sort': value['sort'] == null ? undefined : ((value['sort'] as Array<any>).map(SortObjectToJSON)),
        'numberOfElements': value['numberOfElements'],
        'first': value['first'],
        'last': value['last'],
        'pageable': PageableObjectToJSON(value['pageable']),
        'empty': value['empty'],
    };
}

