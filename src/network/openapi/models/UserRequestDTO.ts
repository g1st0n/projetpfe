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
 * @interface UserRequestDTO
 */
export interface UserRequestDTO {
    /**
     * 
     * @type {string}
     * @memberof UserRequestDTO
     */
    firstName?: string;
    /**
     * 
     * @type {string}
     * @memberof UserRequestDTO
     */
    lastName?: string;
    /**
     * 
     * @type {string}
     * @memberof UserRequestDTO
     */
    address?: string;
    /**
     * 
     * @type {number}
     * @memberof UserRequestDTO
     */
    phoneNumber?: number;
    /**
     * 
     * @type {string}
     * @memberof UserRequestDTO
     */
    password?: string;
    /**
     * 
     * @type {string}
     * @memberof UserRequestDTO
     */
    role?: string;
    /**
     * 
     * @type {string}
     * @memberof UserRequestDTO
     */
    status?: string;
    /**
     * 
     * @type {Date}
     * @memberof UserRequestDTO
     */
    lastAccess?: Date;
    /**
     * 
     * @type {boolean}
     * @memberof UserRequestDTO
     */
    enabled?: boolean;
    /**
     * 
     * @type {Blob}
     * @memberof UserRequestDTO
     */
    image?: Blob;
}

/**
 * Check if a given object implements the UserRequestDTO interface.
 */
export function instanceOfUserRequestDTO(value: object): value is UserRequestDTO {
    return true;
}

export function UserRequestDTOFromJSON(json: any): UserRequestDTO {
    return UserRequestDTOFromJSONTyped(json, false);
}

export function UserRequestDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserRequestDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'firstName': json['firstName'] == null ? undefined : json['firstName'],
        'lastName': json['lastName'] == null ? undefined : json['lastName'],
        'address': json['address'] == null ? undefined : json['address'],
        'phoneNumber': json['phoneNumber'] == null ? undefined : json['phoneNumber'],
        'password': json['password'] == null ? undefined : json['password'],
        'role': json['role'] == null ? undefined : json['role'],
        'status': json['status'] == null ? undefined : json['status'],
        'lastAccess': json['lastAccess'] == null ? undefined : (new Date(json['lastAccess'])),
        'enabled': json['enabled'] == null ? undefined : json['enabled'],
        'image': json['image'] == null ? undefined : json['image'],
    };
}

export function UserRequestDTOToJSON(value?: UserRequestDTO | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'firstName': value['firstName'],
        'lastName': value['lastName'],
        'address': value['address'],
        'phoneNumber': value['phoneNumber'],
        'password': value['password'],
        'role': value['role'],
        'status': value['status'],
        'lastAccess': value['lastAccess'] == null ? undefined : ((value['lastAccess']).toISOString()),
        'enabled': value['enabled'],
        'image': value['image'],
    };
}

