import { IStrategyOptions, Strategy as LocalStrategy, VerifyFunction } from "passport-local";
import { AuthService } from "../services/auth.service";
import { PassportUse } from "../utils/passport.use";
import { UserEntity } from "../../user/entities/user.entity";

const authService: AuthService = new AuthService();

export class LoginStrategy {

    private async verify(
        username: string,
        password: string,
        done: any
    ): Promise<UserEntity> {
        try {
            const user = await authService.validateUser(username, password);

            if (user) return done(null, user);

            return done(null, false, {
                message: 'Invalid username or password'
            });
        } catch (err) {
            return done(err)
        }
    }

    get use() {
        return PassportUse<LocalStrategy, IStrategyOptions, VerifyFunction>(
            'login',
            LocalStrategy,
            {
                usernameField: 'username',
                passwordField: 'password'
            },
            this.verify
            );
    }
}