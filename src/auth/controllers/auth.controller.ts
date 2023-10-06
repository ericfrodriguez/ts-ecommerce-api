import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { HttpResponse } from "../../shared/response/http.response";
import { UserEntity } from "../../user/entities/user.entity";
import { AuthCredentials } from "../interfaces/auth.interface";

export class AuthController extends AuthService {

    constructor(
        protected readonly httpResponse: HttpResponse = new HttpResponse(),
    ) {
        super();
        this.login = this.login.bind(this);
    }

    public async login(req: Request, res: Response) {
        try {
            const user: UserEntity = req.user as UserEntity;

            const userCredentials: AuthCredentials | null = await this.generateJWT(user);
            
            if(userCredentials) {
                res.header('Content-Type', 'application/json');
                res.cookie('accessToken', userCredentials.accessToken, {
                    maxAge: 1000 * 60
                });
                res.write(JSON.stringify(userCredentials));
                return res.end();
            }

            return this.httpResponse.Unauthorized(res, 'No tienes permisos');

        } catch (error) {
            console.log(error);
            return this.httpResponse.InternalServerError(res, error);
        }
    }
}