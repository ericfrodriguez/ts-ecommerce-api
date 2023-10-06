import passport, { Strategy } from 'passport';

type StrategyType<T, U, X> = { new (params: U, verifyCallback: X): T }

export function PassportUse<T extends Strategy, U, X>(
    name: string,
    Strategy: StrategyType<T, U, X>,
    params: U,
    verifyCallback: X
) {
    passport.use(name, new Strategy(params, verifyCallback))
}