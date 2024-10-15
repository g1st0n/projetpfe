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
 * @interface UserRegistrationDto
 */
export interface UserRegistrationDto {
    /**
     * 
     * @type {string}
     * @memberof UserRegistrationDto
     */
    firstName?: string;
    /**
     * 
     * @type {string}
     * @memberof UserRegistrationDto
     */
    lastName?: string;
    /**
     * 
     * @type {number}
     * @memberof UserRegistrationDto
     */
    phoneNumber?: number;
    /**
     * 
     * @type {string}
     * @memberof UserRegistrationDto
     */
    status?: string;
    /**
     * 
     * @type {string}
     * @memberof UserRegistrationDto
     */
    email?: string;
    /**
     * 
     * @type {string}
     * @memberof UserRegistrationDto
     */
    password?: string;
    /**
     * 
     * @type {Blob}
     * @memberof UserRegistrationDto
     */
    profileImage?: Blob;
}

/**
 * Check if a given object implements the UserRegistrationDto interface.
 */
export function instanceOfUserRegistrationDto(value: object): value is UserRegistrationDto {
    return true;
}

export function UserRegistrationDtoFromJSON(json: any): UserRegistrationDto {
    return UserRegistrationDtoFromJSONTyped(json, false);
}

export function UserRegistrationDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserRegistrationDto {
    if (json == null) {
        return json;
    }
    return {
        
        'firstName': json['firstName'] == null ? undefined : json['firstName'],
        'lastName': json['lastName'] == null ? undefined : json['lastName'],
        'phoneNumber': json['phoneNumber'] == null ? undefined : json['phoneNumber'],
        'status': json['status'] == null ? undefined : json['status'],
        'email': json['email'] == null ? undefined : json['email'],
        'password': json['password'] == null ? undefined : json['password'],
        'profileImage': json['profileImage'] == null ? undefined : json['profileImage'],
    };
}

export function UserRegistrationDtoToJSON(value?: UserRegistrationDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'firstName': value['firstName'],
        'lastName': value['lastName'],
        'phoneNumber': value['phoneNumber'],
        'status': value['status'],
        'email': value['email'],
        'password': value['password'],
        'profileImage': value['profileImage'],
    };
}

