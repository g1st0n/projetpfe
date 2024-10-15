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
 * @interface FileStorageRequest
 */
export interface FileStorageRequest {
    /**
     * 
     * @type {Blob}
     * @memberof FileStorageRequest
     */
    file?: Blob;
    /**
     * 
     * @type {string}
     * @memberof FileStorageRequest
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof FileStorageRequest
     */
    fileCategory?: string;
}

/**
 * Check if a given object implements the FileStorageRequest interface.
 */
export function instanceOfFileStorageRequest(value: object): value is FileStorageRequest {
    return true;
}

export function FileStorageRequestFromJSON(json: any): FileStorageRequest {
    return FileStorageRequestFromJSONTyped(json, false);
}

export function FileStorageRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): FileStorageRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'file': json['file'] == null ? undefined : json['file'],
        'description': json['description'] == null ? undefined : json['description'],
        'fileCategory': json['fileCategory'] == null ? undefined : json['fileCategory'],
    };
}

export function FileStorageRequestToJSON(value?: FileStorageRequest | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'file': value['file'],
        'description': value['description'],
        'fileCategory': value['fileCategory'],
    };
}
