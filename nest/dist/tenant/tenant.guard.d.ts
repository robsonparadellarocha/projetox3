import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TenantService } from './tenant/tenant.service';
export declare class TenantGuard implements CanActivate {
    private tenantService;
    constructor(tenantService: TenantService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
