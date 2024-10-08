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
 * @interface RawMaterial
 */
export interface RawMaterial {
    /**
     * 
     * @type {number}
     * @memberof RawMaterial
     */
    idMaterial?: number;
    /**
     * 
     * @type {string}
     * @memberof RawMaterial
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof RawMaterial
     */
    materialType?: string;
    /**
     * 
     * @type {string}
     * @memberof RawMaterial
     */
    supplier?: string;
    /**
     * 
     * @type {number}
     * @memberof RawMaterial
     */
    availableQuantity?: number;
    /**
     * 
     * @type {string}
     * @memberof RawMaterial
     */
    unit?: string;
    /**
     * 
     * @type {string}
     * @memberof RawMaterial
     */
    color?: string;
    /**
     * 
     * @type {string}
     * @memberof RawMaterial
     */
    origin?: string;
    /**
     * 
     * @type {number}
     * @memberof RawMaterial
     */
    unitPrice?: number;
    /**
     * 
     * @type {Array<Product>}
     * @memberof RawMaterial
     */
    products?: Array<Product>;
}

/**
 * Check if a given object implements the RawMaterial interface.
 */
export function instanceOfRawMaterial(value: object): value is RawMaterial {
    return true;
}

export function RawMaterialFromJSON(json: any): RawMaterial {
    return RawMaterialFromJSONTyped(json, false);
}

export function RawMaterialFromJSONTyped(json: any, ignoreDiscriminator: boolean): RawMaterial {
    if (json == null) {
        return json;
    }
    return {
        
        'idMaterial': json['idMaterial'] == null ? undefined : json['idMaterial'],
        'name': json['name'] == null ? undefined : json['name'],
        'materialType': json['materialType'] == null ? undefined : json['materialType'],
        'supplier': json['supplier'] == null ? undefined : json['supplier'],
        'availableQuantity': json['availableQuantity'] == null ? undefined : json['availableQuantity'],
        'unit': json['unit'] == null ? undefined : json['unit'],
        'color': json['color'] == null ? undefined : json['color'],
        'origin': json['origin'] == null ? undefined : json['origin'],
        'unitPrice': json['unitPrice'] == null ? undefined : json['unitPrice'],
        'products': json['products'] == null ? undefined : ((json['products'] as Array<any>).map(ProductFromJSON)),
    };
}

export function RawMaterialToJSON(value?: RawMaterial | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'idMaterial': value['idMaterial'],
        'name': value['name'],
        'materialType': value['materialType'],
        'supplier': value['supplier'],
        'availableQuantity': value['availableQuantity'],
        'unit': value['unit'],
        'color': value['color'],
        'origin': value['origin'],
        'unitPrice': value['unitPrice'],
        'products': value['products'] == null ? undefined : ((value['products'] as Array<any>).map(ProductToJSON)),
    };
}

