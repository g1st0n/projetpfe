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
  OrderRequestDTO,
  OrderResponseDTO,
} from '../models/index';
import {
    OrderRequestDTOFromJSON,
    OrderRequestDTOToJSON,
    OrderResponseDTOFromJSON,
    OrderResponseDTOToJSON,
} from '../models/index';

export interface CreateOrderRequest {
    orderRequestDTO: OrderRequestDTO;
}

export interface DeleteOrderRequest {
    idOrder: number;
}

export interface GetOrderByIdRequest {
    idOrder: number;
}

export interface UpdateOrderRequest {
    idOrder: number;
    orderRequestDTO: OrderRequestDTO;
}

/**
 * 
 */
export class OrderControllerApi extends runtime.BaseAPI {

    /**
     */
    async createOrderRaw(requestParameters: CreateOrderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<OrderResponseDTO>> {
        if (requestParameters['orderRequestDTO'] == null) {
            throw new runtime.RequiredError(
                'orderRequestDTO',
                'Required parameter "orderRequestDTO" was null or undefined when calling createOrder().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/orders/add`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: OrderRequestDTOToJSON(requestParameters['orderRequestDTO']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OrderResponseDTOFromJSON(jsonValue));
    }

    /**
     */
    async createOrder(requestParameters: CreateOrderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<OrderResponseDTO> {
        const response = await this.createOrderRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async deleteOrderRaw(requestParameters: DeleteOrderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['idOrder'] == null) {
            throw new runtime.RequiredError(
                'idOrder',
                'Required parameter "idOrder" was null or undefined when calling deleteOrder().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/orders/{idOrder}`.replace(`{${"idOrder"}}`, encodeURIComponent(String(requestParameters['idOrder']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async deleteOrder(requestParameters: DeleteOrderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteOrderRaw(requestParameters, initOverrides);
    }

    /**
     */
    async getAllOrdersRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<OrderResponseDTO>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/orders`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(OrderResponseDTOFromJSON));
    }

    /**
     */
    async getAllOrders(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<OrderResponseDTO>> {
        const response = await this.getAllOrdersRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async getOrderByIdRaw(requestParameters: GetOrderByIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<OrderResponseDTO>> {
        if (requestParameters['idOrder'] == null) {
            throw new runtime.RequiredError(
                'idOrder',
                'Required parameter "idOrder" was null or undefined when calling getOrderById().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/orders/{idOrder}`.replace(`{${"idOrder"}}`, encodeURIComponent(String(requestParameters['idOrder']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OrderResponseDTOFromJSON(jsonValue));
    }

    /**
     */
    async getOrderById(requestParameters: GetOrderByIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<OrderResponseDTO> {
        const response = await this.getOrderByIdRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async updateOrderRaw(requestParameters: UpdateOrderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<OrderResponseDTO>> {
        if (requestParameters['idOrder'] == null) {
            throw new runtime.RequiredError(
                'idOrder',
                'Required parameter "idOrder" was null or undefined when calling updateOrder().'
            );
        }

        if (requestParameters['orderRequestDTO'] == null) {
            throw new runtime.RequiredError(
                'orderRequestDTO',
                'Required parameter "orderRequestDTO" was null or undefined when calling updateOrder().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/orders/{idOrder}`.replace(`{${"idOrder"}}`, encodeURIComponent(String(requestParameters['idOrder']))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: OrderRequestDTOToJSON(requestParameters['orderRequestDTO']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => OrderResponseDTOFromJSON(jsonValue));
    }

    /**
     */
    async updateOrder(requestParameters: UpdateOrderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<OrderResponseDTO> {
        const response = await this.updateOrderRaw(requestParameters, initOverrides);
        return await response.value();
    }

}