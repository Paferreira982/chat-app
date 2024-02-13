import UserRepository from "@/infra/repository/user/mongodb/user.repository";

export async function GET(req: Request, res: Response) {
    try {
        const users = await UserRepository.findAll();
        return Response.json(users);
    } catch (error: any) {
        return Response.json({ error: 'INTERNAL_SERVER_ERROR' }, { status: 500 });
    }
}