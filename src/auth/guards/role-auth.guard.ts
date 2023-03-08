import { CanActivate, ExecutionContext, Type, mixin } from "@nestjs/common";
import { JwtAuthGuard } from "./jwt-auth.guard";

export enum Roles {
    Admin = "Admin",
    User = "User"
}


const RoleGuard = (role: Roles): Type<CanActivate> => {
    class RoleGuardMixin extends JwtAuthGuard {
        async canActivate(context: ExecutionContext) {
            await super.canActivate(context);
            const request = context.switchToHttp().getRequest<any>();
            const user = request.user;
            return role === user.role
        }
    }
    return RoleGuardMixin;
}

export default RoleGuard  

  