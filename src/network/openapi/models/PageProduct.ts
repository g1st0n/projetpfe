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
import type { Product } from './Product';
import {
    ProductFromJSON,
    ProductFromJSONTyped,
    ProductToJSON,
} from './Product';

/**
 * 
 * @export
 * @interface PageProduct
 */
export interface PageProduct {
    /**
     * 
     * @type {number}
     * @memberof PageProduct
     */
    totalPages?: number;
    /**
     * 
     * @type {number}
     * @memberof PageProduct
     */
    totalElements?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PageProduct
     */
    first?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PageProduct
     */
    last?: boolean;
    /**
     * 
     * @type {number}
     * @memberof PageProduct
     */
    size?: number;
    /**
     * 
     * @type {Array<Product>}
     * @memberof PageProduct
     */
    content?: Array<Product>;
    /**
     * 
     * @type {number}
     * @memberof PageProduct
     */
    number?: number;
    /**
     * 
     * @type {Array<SortObject>}
     * @memberof PageProduct
     */
    sort?: Array<SortObject>;
    /**
     * 
     * @type {number}
     * @memberof PageProduct
     */
    numberOfElements?: number;
    /**
     * 
     * @type {PageableObject}
     * @memberof PageProduct
     */
    pageable?: PageableObject;
    /**
     * 
     * @type {boolean}
     * @memberof PageProduct
     */
    empty?: boolean;
}

/**
 * Check if a given object implements the PageProduct interface.
 */
export function instanceOfPageProduct(value: object): value is PageProduct {
    return true;
}

export function PageProductFromJSON(json: any): PageProduct {
    return PageProductFromJSONTyped(json, false);
}

export function PageProductFromJSONTyped(json: any, ignoreDiscriminator: boolean): PageProduct {
    if (json == null) {
        return json;
    }
    return {
        
        'totalPages': json['totalPages'] == null ? undefined : json['totalPages'],
        'totalElements': json['totalElements'] == null ? undefined : json['totalElements'],
        'first': json['first'] == null ? undefined : json['first'],
        'last': json['last'] == null ? undefined : json['last'],
        'size': json['size'] == null ? undefined : json['size'],
        'content': json['content'] == null ? undefined : ((json['content'] as Array<any>).map(ProductFromJSON)),
        'number': json['number'] == null ? undefined : json['number'],

        'sort': Array.isArray(json['sort']) ? json['sort'].map(SortObjectFromJSON) : [SortObjectFromJSON(json['sort'])],        'numberOfElements': json['numberOfElements'] == null ? undefined : json['numberOfElements'],
        'pageable': json['pageable'] == null ? undefined : PageableObjectFromJSON(json['pageable']),
        'empty': json['empty'] == null ? undefined : json['empty'],
    };
}

export function PageProductToJSON(value?: PageProduct | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'totalPages': value['totalPages'],
        'totalElements': value['totalElements'],
        'first': value['first'],
        'last': value['last'],
        'size': value['size'],
        'content': value['content'] == null ? undefined : ((value['content'] as Array<any>).map(ProductToJSON)),
        'number': value['number'],

        'sort': value['sort'] == null ? undefined : ((value['sort'] as Array<any>).map(SortObjectToJSON)),        'numberOfElements': value['numberOfElements'],
        'pageable': PageableObjectToJSON(value['pageable']),
        'empty': value['empty'],
    };
}

