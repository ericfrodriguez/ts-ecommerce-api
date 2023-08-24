import { Response } from "express";

export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}

export class HttpResponse {

    public Ok(res: Response, data?: any): Response {
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            statusMessage: 'Success',
            data
        });
    }

    public Created(res: Response, data?: any): Response {
        return res.status(HttpStatus.CREATED).json({
            status: HttpStatus.CREATED,
            statusMessage: 'Created',
            data
        });
    }

    public NotFound(res: Response, data?: any ): Response {
        return res.status(HttpStatus.NOT_FOUND).json({
            status: HttpStatus.NOT_FOUND,
            statusMessage: 'Not Found',
            error: data
        });
    }

    public Unauthorized(res: Response, data?: any ): Response {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            status: HttpStatus.UNAUTHORIZED,
            statusMessage: 'Unauthorized',
            error: data
        });
    }

    public Forbidden(res: Response, data?: any ): Response {
        return res.status(HttpStatus.FORBIDDEN).json({
            status: HttpStatus.FORBIDDEN,
            statusMessage: 'Forbidden',
            error: data
        });
    }

    public InternalServerError(res: Response, data?: any ): Response {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            statusMessage: 'Internal Server Error',
            error: data
        });
    }

}