import prisma from '@/utils/connect';
import { NextResponse } from 'next/server';
import { getAuthSession } from '../auth/[...nextauth]/route';

//GET ALL POSTS FOR HOME PAGE
export const GET = async req => {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get('page')) || 1;
  const cat = searchParams.get('cat');

  const POST_PER_PAGE = 6;

  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    where: {
      ...(cat && { catSlug: cat }),
    },
    orderBy: {
      createdAt: 'desc',
    },
  };

  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({ where: query.where }),
    ]);

    return new NextResponse(
      JSON.stringify({ posts, count }, { status: 200 })
    );
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong!' }, { status: 500 })
    );
  }
};

//CREATE A POST
export const POST = async req => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: 'Not Authenticated!' }, { status: 401 })
    );
  }

  try {
    const body = await req.json();
    console.log(body);

    // Check if required fields are present in the request body
    if (!body.title || !body.desc || !body.catSlug) {
      return new NextResponse(
        JSON.stringify({
          message: 'input missing fields',
        }),
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: { ...body, userEmail: session.user.email },
    });

    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong!' }),
      { status: 500 }
    );
  }
};
