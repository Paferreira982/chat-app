import { LoginUsecase } from "@/usecases/user/login/login.usecase";
import UserRepository from "@/infra/repository/user/mongodb/user.repository";
import Authenticator from "@/infra/auth/jsonwebtoken";

export async function POST(req: Request, res: Response) {
    try {
        const { email, password } = await req.json();
    
        const loginUsecase = new LoginUsecase(UserRepository, Authenticator);
        const response = await loginUsecase.execute({ email, password });

        return Response.json(response);
    } catch (error: unknown) {
        const err = error as Error;
        if (err.message === 'Invalid Credentials') {
            return Response.json({ error: 'UNAUTHORIZED' }, { status: 401 });
        }

        return Response.json({ error: 'INTERNAL_SERVER_ERROR' }, { status: 500 });
    }
}