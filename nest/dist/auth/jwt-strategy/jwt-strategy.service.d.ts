import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
declare const JwtStrategyService_base: new (...args: any[]) => Strategy;
export declare class JwtStrategyService extends JwtStrategyService_base {
    constructor(configService: ConfigService);
    validate(payload: any): Promise<any>;
}
export {};
