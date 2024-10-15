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
/**
 * 
 * @export
 * @interface FileStorageResponse
 */
export interface FileStorageResponse {
    /**
     * 
     * @type {number}
     * @memberof FileStorageResponse
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof FileStorageResponse
     */
    fileName?: string;
    /**
     * 
     * @type {string}
     * @memberof FileStorageResponse
     */
    fileType?: string;
    /**
     * 
     * @type {Date}
     * @memberof FileStorageResponse
     */
    creationDate?: Date;
}

/**
 * Check if a given object implements the FileStorageResponse interface.
 */
export function instanceOfFileStorageResponse(value: object): value is FileStorageResponse {
    return true;
}

export function FileStorageResponseFromJSON(json: any): FileStorageResponse {
    return FileStorageResponseFromJSONTyped(json, false);
}

export function FileStorageResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): FileStorageResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'] == null ? undefined : json['id'],
        'fileName': json['fileName'] == null ? undefined : json['fileName'],
        'fileType': json['fileType'] == null ? undefined : json['fileType'],
        'creationDate': json['creationDate'] == null ? undefined : (new Date(json['creationDate'])),
    };
}

export function FileStorageResponseToJSON(value?: FileStorageResponse | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'id': value['id'],
        'fileName': value['fileName'],
        'fileType': value['fileType'],
        'creationDate': value['creationDate'] == null ? undefined : ((value['creationDate']).toISOString()),
    };
}

