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

/**
 * 
 * @export
 * @interface ProductionPlanRequestDTO
 */
export interface ProductionPlanRequestDTO {
    /**
     * 
     * @type {Date}
     * @memberof ProductionPlanRequestDTO
     */
    date?: Date;
    /**
     * 
     * @type {number}
     * @memberof ProductionPlanRequestDTO
     */
    quantity?: number;
    /**
     * 
     * @type {LocalTime}
     * @memberof ProductionPlanRequestDTO
     */
    duration?: LocalTime;
    /**
     * 
     * @type {number}
     * @memberof ProductionPlanRequestDTO
     */
    productId?: number;
    /**
     * 
     * @type {number}
     * @memberof ProductionPlanRequestDTO
     */
    workshopId?: number;
    /**
     * 
     * @type {number}
     * @memberof ProductionPlanRequestDTO
     */
    workforce?: number;
    /**
     * 
     * @type {string}
     * @memberof ProductionPlanRequestDTO
     */
    comment?: string;
}

/**
 * Check if a given object implements the ProductionPlanRequestDTO interface.
 */
export function instanceOfProductionPlanRequestDTO(value: object): value is ProductionPlanRequestDTO {
    return true;
}

export function ProductionPlanRequestDTOFromJSON(json: any): ProductionPlanRequestDTO {
    return ProductionPlanRequestDTOFromJSONTyped(json, false);
}

export function ProductionPlanRequestDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProductionPlanRequestDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'date': json['date'] == null ? undefined : (new Date(json['date'])),
        'quantity': json['quantity'] == null ? undefined : json['quantity'],
        'duration': json['duration'] == null ? undefined : LocalTimeFromJSON(json['duration']),
        'productId': json['productId'] == null ? undefined : json['productId'],
        'workshopId': json['workshopId'] == null ? undefined : json['workshopId'],
        'workforce': json['workforce'] == null ? undefined : json['workforce'],
        'comment': json['comment'] == null ? undefined : json['comment'],
    };
}

export function ProductionPlanRequestDTOToJSON(value?: ProductionPlanRequestDTO | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'date': value['date'] == null ? undefined : ((value['date']).toISOString()),
        'quantity': value['quantity'],
        'duration': LocalTimeToJSON(value['duration']),
        'productId': value['productId'],
        'workshopId': value['workshopId'],
        'workforce': value['workforce'],
        'comment': value['comment'],
    };
}
