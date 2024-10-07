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
import type { Client } from './Client';
import {
    ClientFromJSON,
    ClientFromJSONTyped,
    ClientToJSON,
} from './Client';

/**
 * 
 * @export
 * @interface Order
 */
export interface Order {
    /**
     * 
     * @type {number}
     * @memberof Order
     */
    idOrder?: number;
    /**
     * 
     * @type {Client}
     * @memberof Order
     */
    client?: Client;
    /**
     * 
     * @type {Product}
     * @memberof Order
     */
    product?: Product;
    /**
     * 
     * @type {Date}
     * @memberof Order
     */
    date?: Date;
    /**
     * 
     * @type {number}
     * @memberof Order
     */
    quantity?: number;
}

/**
 * Check if a given object implements the Order interface.
 */
export function instanceOfOrder(value: object): value is Order {
    return true;
}

export function OrderFromJSON(json: any): Order {
    return OrderFromJSONTyped(json, false);
}

export function OrderFromJSONTyped(json: any, ignoreDiscriminator: boolean): Order {
    if (json == null) {
        return json;
    }
    return {
        
        'idOrder': json['idOrder'] == null ? undefined : json['idOrder'],
        'client': json['client'] == null ? undefined : ClientFromJSON(json['client']),
        'product': json['product'] == null ? undefined : ProductFromJSON(json['product']),
        'date': json['date'] == null ? undefined : (new Date(json['date'])),
        'quantity': json['quantity'] == null ? undefined : json['quantity'],
    };
}

export function OrderToJSON(value?: Order | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'idOrder': value['idOrder'],
        'client': ClientToJSON(value['client']),
        'product': ProductToJSON(value['product']),
        'date': value['date'] == null ? undefined : ((value['date']).toISOString()),
        'quantity': value['quantity'],
    };
}
