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


import * as runtime from '../runtime';
import type {
  JwtRequest,
  JwtResponse,
  User,
  UserRegistrationDto,
} from '../models/index';
import {
    JwtRequestFromJSON,
    JwtRequestToJSON,
    JwtResponseFromJSON,
    JwtResponseToJSON,
    UserFromJSON,
    UserToJSON,
    UserRegistrationDtoFromJSON,
    UserRegistrationDtoToJSON,
} from '../models/index';

export interface LoginRequest {
    jwtRequest: JwtRequest;
}

export interface RegisterUserRequest {
    registrationDto: UserRegistrationDto;
}

/**
 * 
 */
export class AuthControllerApi extends runtime.BaseAPI {

    /**
     */
    async loginRaw(requestParameters: LoginRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<JwtResponse>> {
        if (requestParameters['jwtRequest'] == null) {
            throw new runtime.RequiredError(
                'jwtRequest',
                'Required parameter "jwtRequest" was null or undefined when calling login().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/auth/login`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: JwtRequestToJSON(requestParameters['jwtRequest']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => JwtResponseFromJSON(jsonValue));
    }

    /**
     */
    async login(requestParameters: LoginRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<JwtResponse> {
        const response = await this.loginRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async logoutRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<object>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/auth/logout`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     */
    async logout(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<object> {
        const response = await this.logoutRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async registerUserRaw(requestParameters: RegisterUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<User>> {
        if (requestParameters['registrationDto'] == null) {
            throw new runtime.RequiredError(
                'registrationDto',
                'Required parameter "registrationDto" was null or undefined when calling registerUser().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['registrationDto'] != null) {
            queryParameters['registrationDto'] = requestParameters['registrationDto'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/auth/register`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserFromJSON(jsonValue));
    }

    /**
     */
    async registerUser(requestParameters: RegisterUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<User> {
        const response = await this.registerUserRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
