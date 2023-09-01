import { Request, Response, NextFunction } from "express"

export type ValidatorMiddleware = (req: Request, res: Response, next: NextFunction) => Promise<void | Response>