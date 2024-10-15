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
import type { CustomerOrder } from './CustomerOrder';
import {
    CustomerOrderFromJSON,
    CustomerOrderFromJSONTyped,
    CustomerOrderToJSON,
} from './CustomerOrder';
import type { SubCategory } from './SubCategory';
import {
    SubCategoryFromJSON,
    SubCategoryFromJSONTyped,
    SubCategoryToJSON,
} from './SubCategory';
import type { FileStorage } from './FileStorage';
import {
    FileStorageFromJSON,
    FileStorageFromJSONTyped,
    FileStorageToJSON,
} from './FileStorage';
import type { RawMaterial } from './RawMaterial';
import {
    RawMaterialFromJSON,
    RawMaterialFromJSONTyped,
    RawMaterialToJSON,
} from './RawMaterial';

/**
 * 
 * @export
 * @interface Product
 */
export interface Product {
    /**
     * 
     * @type {number}
     * @memberof Product
     */
    idProduct?: number;
    /**
     * 
     * @type {string}
     * @memberof Product
     */
    reference?: string;
    /**
     * 
     * @type {string}
     * @memberof Product
     */
    designation?: string;
    /**
     * 
     * @type {string}
     * @memberof Product
     */
    color?: string;
    /**
     * 
     * @type {number}
     * @memberof Product
     */
    weight?: number;
    /**
     * 
     * @type {number}
     * @memberof Product
     */
    dimension?: number;
    /**
     * 
     * @type {number}
     * @memberof Product
     */
    productionDuration?: number;
    /**
     * 
     * @type {number}
     * @memberof Product
     */
    price?: number;
    /**
     * 
     * @type {number}
     * @memberof Product
     */
    quantity?: number;
    /**
     * 
     * @type {number}
     * @memberof Product
     */
    productionCost?: number;
    /**
     * 
     * @type {SubCategory}
     * @memberof Product
     */
    subCategory?: SubCategory;
    /**
     * 
     * @type {Array<CustomerOrder>}
     * @memberof Product
     */
    orders?: Array<CustomerOrder>;
    /**
     * 
     * @type {Array<ProductionPlan>}
     * @memberof Product
     */
    productionPlans?: Array<ProductionPlan>;
    /**
     * 
     * @type {RawMaterial}
     * @memberof Product
     */
    rawMaterial?: RawMaterial;
    /**
     * 
     * @type {FileStorage}
     * @memberof Product
     */
    logo?: FileStorage;
}

/**
 * Check if a given object implements the Product interface.
 */
export function instanceOfProduct(value: object): value is Product {
    return true;
}

export function ProductFromJSON(json: any): Product {
    return ProductFromJSONTyped(json, false);
}

export function ProductFromJSONTyped(json: any, ignoreDiscriminator: boolean): Product {
    if (json == null) {
        return json;
    }
    return {
        
        'idProduct': json['idProduct'] == null ? undefined : json['idProduct'],
        'reference': json['reference'] == null ? undefined : json['reference'],
        'designation': json['designation'] == null ? undefined : json['designation'],
        'color': json['color'] == null ? undefined : json['color'],
        'weight': json['weight'] == null ? undefined : json['weight'],
        'dimension': json['dimension'] == null ? undefined : json['dimension'],
        'productionDuration': json['productionDuration'] == null ? undefined : json['productionDuration'],
        'price': json['price'] == null ? undefined : json['price'],
        'quantity': json['quantity'] == null ? undefined : json['quantity'],
        'productionCost': json['productionCost'] == null ? undefined : json['productionCost'],
        'subCategory': json['subCategory'] == null ? undefined : SubCategoryFromJSON(json['subCategory']),
        'orders': json['orders'] == null ? undefined : ((json['orders'] as Array<any>).map(CustomerOrderFromJSON)),
        'productionPlans': json['productionPlans'] == null ? undefined : ((json['productionPlans'] as Array<any>).map(ProductionPlanFromJSON)),
        'rawMaterial': json['rawMaterial'] == null ? undefined : RawMaterialFromJSON(json['rawMaterial']),
        'logo': json['logo'] == null ? undefined : FileStorageFromJSON(json['logo']),
    };
}

export function ProductToJSON(value?: Product | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'idProduct': value['idProduct'],
        'reference': value['reference'],
        'designation': value['designation'],
        'color': value['color'],
        'weight': value['weight'],
        'dimension': value['dimension'],
        'productionDuration': value['productionDuration'],
        'price': value['price'],
        'quantity': value['quantity'],
        'productionCost': value['productionCost'],
        'subCategory': SubCategoryToJSON(value['subCategory']),
        'orders': value['orders'] == null ? undefined : ((value['orders'] as Array<any>).map(CustomerOrderToJSON)),
        'productionPlans': value['productionPlans'] == null ? undefined : ((value['productionPlans'] as Array<any>).map(ProductionPlanToJSON)),
        'rawMaterial': RawMaterialToJSON(value['rawMaterial']),
        'logo': FileStorageToJSON(value['logo']),
    };
}

