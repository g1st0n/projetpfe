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
import type { User } from './User';
import {
    UserFromJSON,
    UserFromJSONTyped,
    UserToJSON,
} from './User';
import type { CustomerOrder } from './CustomerOrder';
import {
    CustomerOrderFromJSON,
    CustomerOrderFromJSONTyped,
    CustomerOrderToJSON,
} from './CustomerOrder';

/**
 * 
 * @export
 * @interface Client
 */
export interface Client {
    /**
     * 
     * @type {number}
     * @memberof Client
     */
    idClient?: number;
    /**
     * 
     * @type {string}
     * @memberof Client
     */
    fullName?: string;
    /**
     * 
     * @type {string}
     * @memberof Client
     */
    clientType?: string;
    /**
     * 
     * @type {string}
     * @memberof Client
     */
    email?: string;
    /**
     * 
     * @type {string}
     * @memberof Client
     */
    address?: string;
    /**
     * 
     * @type {string}
     * @memberof Client
     */
    telephone?: string;
    /**
     * 
     * @type {Array<CustomerOrder>}
     * @memberof Client
     */
    orders?: Array<CustomerOrder>;
    /**
     * 
     * @type {User}
     * @memberof Client
     */
    user?: User;
}

/**
 * Check if a given object implements the Client interface.
 */
export function instanceOfClient(value: object): value is Client {
    return true;
}

export function ClientFromJSON(json: any): Client {
    return ClientFromJSONTyped(json, false);
}

export function ClientFromJSONTyped(json: any, ignoreDiscriminator: boolean): Client {
    if (json == null) {
        return json;
    }
    return {
        
        'idClient': json['idClient'] == null ? undefined : json['idClient'],
        'fullName': json['fullName'] == null ? undefined : json['fullName'],
        'clientType': json['clientType'] == null ? undefined : json['clientType'],
        'email': json['email'] == null ? undefined : json['email'],
        'address': json['address'] == null ? undefined : json['address'],
        'telephone': json['telephone'] == null ? undefined : json['telephone'],
        'orders': json['orders'] == null ? undefined : ((json['orders'] as Array<any>).map(CustomerOrderFromJSON)),
        'user': json['user'] == null ? undefined : UserFromJSON(json['user']),
    };
}

export function ClientToJSON(value?: Client | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'idClient': value['idClient'],
        'fullName': value['fullName'],
        'clientType': value['clientType'],
        'email': value['email'],
        'address': value['address'],
        'telephone': value['telephone'],
        'orders': value['orders'] == null ? undefined : ((value['orders'] as Array<any>).map(CustomerOrderToJSON)),
        'user': UserToJSON(value['user']),
    };
}

