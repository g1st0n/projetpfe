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
import type { Product } from './Product';
import {
    ProductFromJSON,
    ProductFromJSONTyped,
    ProductToJSON,
} from './Product';

/**
 * 
 * @export
 * @interface SubCategory
 */
export interface SubCategory {
    /**
     * 
     * @type {number}
     * @memberof SubCategory
     */
    idSubCategory?: number;
    /**
     * 
     * @type {string}
     * @memberof SubCategory
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof SubCategory
     */
    reference?: string;
    /**
     * 
     * @type {Array<Product>}
     * @memberof SubCategory
     */
    products?: Array<Product>;
}

/**
 * Check if a given object implements the SubCategory interface.
 */
export function instanceOfSubCategory(value: object): value is SubCategory {
    return true;
}

export function SubCategoryFromJSON(json: any): SubCategory {
    return SubCategoryFromJSONTyped(json, false);
}

export function SubCategoryFromJSONTyped(json: any, ignoreDiscriminator: boolean): SubCategory {
    if (json == null) {
        return json;
    }
    return {
        
        'idSubCategory': json['idSubCategory'] == null ? undefined : json['idSubCategory'],
        'name': json['name'] == null ? undefined : json['name'],
        'reference': json['reference'] == null ? undefined : json['reference'],
        'products': json['products'] == null ? undefined : ((json['products'] as Array<any>).map(ProductFromJSON)),
    };
}

export function SubCategoryToJSON(value?: SubCategory | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'idSubCategory': value['idSubCategory'],
        'name': value['name'],
        'reference': value['reference'],
        'products': value['products'] == null ? undefined : ((value['products'] as Array<any>).map(ProductToJSON)),
    };
}

