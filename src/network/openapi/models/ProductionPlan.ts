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
import type { LocalTime } from './LocalTime';
import {
    LocalTimeFromJSON,
    LocalTimeFromJSONTyped,
    LocalTimeToJSON,
} from './LocalTime';
import type { Product } from './Product';
import {
    ProductFromJSON,
    ProductFromJSONTyped,
    ProductToJSON,
} from './Product';
import type { Workshop } from './Workshop';
import {
    WorkshopFromJSON,
    WorkshopFromJSONTyped,
    WorkshopToJSON,
} from './Workshop';

/**
 * 
 * @export
 * @interface ProductionPlan
 */
export interface ProductionPlan {
    /**
     * 
     * @type {number}
     * @memberof ProductionPlan
     */
    idPlanning?: number;
    /**
     * 
     * @type {Date}
     * @memberof ProductionPlan
     */
    date?: Date;
    /**
     * 
     * @type {number}
     * @memberof ProductionPlan
     */
    quantity?: number;
    /**
     * 
     * @type {LocalTime}
     * @memberof ProductionPlan
     */
    duration?: LocalTime;
    /**
     * 
     * @type {number}
     * @memberof ProductionPlan
     */
    waste?: number;
    /**
     * 
     * @type {Product}
     * @memberof ProductionPlan
     */
    product?: Product;
    /**
     * 
     * @type {Workshop}
     * @memberof ProductionPlan
     */
    workshop?: Workshop;
    /**
     * 
     * @type {number}
     * @memberof ProductionPlan
     */
    workforce?: number;
    /**
     * 
     * @type {string}
     * @memberof ProductionPlan
     */
    comment?: string;
}

/**
 * Check if a given object implements the ProductionPlan interface.
 */
export function instanceOfProductionPlan(value: object): value is ProductionPlan {
    return true;
}

export function ProductionPlanFromJSON(json: any): ProductionPlan {
    return ProductionPlanFromJSONTyped(json, false);
}

export function ProductionPlanFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProductionPlan {
    if (json == null) {
        return json;
    }
    return {
        
        'idPlanning': json['idPlanning'] == null ? undefined : json['idPlanning'],
        'date': json['date'] == null ? undefined : (new Date(json['date'])),
        'quantity': json['quantity'] == null ? undefined : json['quantity'],
        'duration': json['duration'] == null ? undefined : LocalTimeFromJSON(json['duration']),
        'waste': json['waste'] == null ? undefined : json['waste'],
        'product': json['product'] == null ? undefined : ProductFromJSON(json['product']),
        'workshop': json['workshop'] == null ? undefined : WorkshopFromJSON(json['workshop']),
        'workforce': json['workforce'] == null ? undefined : json['workforce'],
        'comment': json['comment'] == null ? undefined : json['comment'],
    };
}

export function ProductionPlanToJSON(value?: ProductionPlan | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'idPlanning': value['idPlanning'],
        'date': value['date'] == null ? undefined : ((value['date']).toISOString()),
        'quantity': value['quantity'],
        'duration': LocalTimeToJSON(value['duration']),
        'waste': value['waste'],
        'product': ProductToJSON(value['product']),
        'workshop': WorkshopToJSON(value['workshop']),
        'workforce': value['workforce'],
        'comment': value['comment'],
    };
}

