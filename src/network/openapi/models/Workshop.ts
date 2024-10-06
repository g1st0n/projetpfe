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
import type { ProductionPlan } from './ProductionPlan';
import {
    ProductionPlanFromJSON,
    ProductionPlanFromJSONTyped,
    ProductionPlanToJSON,
} from './ProductionPlan';

/**
 * 
 * @export
 * @interface Workshop
 */
export interface Workshop {
    /**
     * 
     * @type {number}
     * @memberof Workshop
     */
    idWorkshop?: number;
    /**
     * 
     * @type {number}
     * @memberof Workshop
     */
    workshopNumber?: number;
    /**
     * 
     * @type {number}
     * @memberof Workshop
     */
    productionCapacity?: number;
    /**
     * 
     * @type {number}
     * @memberof Workshop
     */
    machineCount?: number;
    /**
     * 
     * @type {number}
     * @memberof Workshop
     */
    machineCost?: number;
    /**
     * 
     * @type {Array<ProductionPlan>}
     * @memberof Workshop
     */
    productionPlans?: Array<ProductionPlan>;
}

/**
 * Check if a given object implements the Workshop interface.
 */
export function instanceOfWorkshop(value: object): value is Workshop {
    return true;
}

export function WorkshopFromJSON(json: any): Workshop {
    return WorkshopFromJSONTyped(json, false);
}

export function WorkshopFromJSONTyped(json: any, ignoreDiscriminator: boolean): Workshop {
    if (json == null) {
        return json;
    }
    return {
        
        'idWorkshop': json['idWorkshop'] == null ? undefined : json['idWorkshop'],
        'workshopNumber': json['workshopNumber'] == null ? undefined : json['workshopNumber'],
        'productionCapacity': json['productionCapacity'] == null ? undefined : json['productionCapacity'],
        'machineCount': json['machineCount'] == null ? undefined : json['machineCount'],
        'machineCost': json['machineCost'] == null ? undefined : json['machineCost'],
        'productionPlans': json['productionPlans'] == null ? undefined : ((json['productionPlans'] as Array<any>).map(ProductionPlanFromJSON)),
    };
}

export function WorkshopToJSON(value?: Workshop | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'idWorkshop': value['idWorkshop'],
        'workshopNumber': value['workshopNumber'],
        'productionCapacity': value['productionCapacity'],
        'machineCount': value['machineCount'],
        'machineCost': value['machineCost'],
        'productionPlans': value['productionPlans'] == null ? undefined : ((value['productionPlans'] as Array<any>).map(ProductionPlanToJSON)),
    };
}

