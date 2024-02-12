import { RegisterUserUsecase } from "@/usecases/user/register/register.usecase";
import UserRepository from "@/infra/repository/user/mongodb/user.repository";
import Authenticator from "@/infra/auth/jsonwebtoken";

export async function POST(req: Request, res: Response) {
    try {
        const { email, name, password, profileImage } = await req.json();
        const registerUseCase = new RegisterUserUsecase(UserRepository, Authenticator);
        const response = await registerUseCase.execute({ email, name, password, profileImage });

        return Response.json(response);
    } catch (error: any) {
        console.log(error);
        console.log("name", error.name);

        // TODO: Ajustar STATUS ERROS PARA ENUM FAKE.
        if (error.name == 'DomainException') {
            return Response.json({ error: 'BAD_REQUEST', message: error.message }, { status: 400 });
        }

        if (error.name == 'MongoServerError' && error.code === 11000) {
            return Response.json({ error: 'BAD_REQUEST', message: 'E-mail já cadastrado.' }, { status: 400 });
        }

        return Response.json({ error: 'INTERNAL_SERVER_ERROR' }, { status: 500 });
    }
}