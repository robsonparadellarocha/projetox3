import { HttpService } from '@nestjs/axios';
export declare class AuthService {
    private http;
    constructor(http: HttpService);
    login(username: string, password: string): Promise<any>;
}
