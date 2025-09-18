import { NextResponse } from 'next/server';
import { UserService } from '@/services/user.service';
import { HTTP_STATUS } from '@/constants/httpStatus';
import { createUserSchema } from '@/validation/user.schema';

export async function GET() {
  try {
    const users = await UserService.getUsers();
    return NextResponse.json(users, { status: HTTP_STATUS.OK });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch users', error },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parseResult = createUserSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parseResult.error.flatten() },
        { status: HTTP_STATUS.BAD_REQUEST },
      );
    }

    const { firstName, lastName, participationPercentage } = parseResult.data;

    const user = await UserService.createUser(firstName, lastName, participationPercentage);

    return NextResponse.json(user, { status: HTTP_STATUS.CREATED });
  } catch (error) {
    return NextResponse.json(
      { message: 'Some unexpected error occurred!', error },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR },
    );
  }
}
