import { ServerConfig } from "../../config/config";
import { UserService } from '../../user/services/user.service';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { UserEntity } from "../../user/entities/user.entity";
import { AuthCredentials, PayloadToken } from "../interfaces/auth.interface";

export class AuthService extends ServerConfig {


    constructor(
        protected readonly userService: UserService = new UserService(),
        private readonly jwtInstance = jwt,
    ) {
        super();
    }

    public async validateUser(username: string, password: string): Promise<UserEntity | null> {

        let userByEmail: UserEntity | null = await this.userService.findUserByEmail(username);
        let userByUsername: UserEntity | null = await this.userService.findUserByUsername(username);

        const user: UserEntity | null = userByEmail || userByUsername;

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password!);

            if (isMatch) return user;
        }

        return null;
    }

    public sign(payload: jwt.JwtPayload, secret: string | undefined): string {
        return this.jwtInstance.sign(payload, secret!, { expiresIn: '10h' })
    }

    public async generateJWT(user: UserEntity): Promise<AuthCredentials | null> {
        try {
            const userFromDB = await this.userService.findUserWithRole(user.id, user.role);

            let payload: PayloadToken;

            if (userFromDB) {
                payload = {
                    role: userFromDB!.role,
                    sub: userFromDB!.id
                }

                return {
                    accessToken: this.sign(payload, this.getEnvironment('JWT_SECRET')),
                    user: userFromDB
                }
            }

            return null;

        } catch (error) {
            console.log(error)
            throw new Error("Error attempting generate accessToken");
        }
    }
}