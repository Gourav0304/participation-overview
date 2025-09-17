import { NextResponse } from 'next/server';
import { UserService } from '@/services/user.service';
import { HTTP_STATUS } from '@/constants/httpStatus';

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
    const { firstName, lastName, participationPercentage } = await req.json();

    if (!firstName || !lastName || typeof participationPercentage !== 'number') {
      return NextResponse.json({ error: 'Invalid input' }, { status: HTTP_STATUS.BAD_REQUEST });
    }

    const user = await UserService.createUser(firstName, lastName, participationPercentage);

    return NextResponse.json(user, { status: HTTP_STATUS.CREATED });
  } catch (error) {
    return NextResponse.json(
      { messag: 'Some unexpected error occured!', error },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR },
    );
  }
}
