import prisma from '@/utils/connect';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const mostViewedPost = await prisma.post.findFirst({
      orderBy: { views: 'desc' },
      include: {
        user: true,
      },
    });

    if (!mostViewedPost) {
      return new NextResponse(
        JSON.stringify({ message: 'No posts found' }),
        {
          status: 404,
        }
      );
    }

    const filteredPost = {
      title: mostViewedPost.title,
      desc: mostViewedPost.desc,
      image: mostViewedPost.img,
      slug: mostViewedPost.slug,
      user: {
        name: mostViewedPost.user.name,
        email: mostViewedPost.user.email,
      },
    };

    return new NextResponse(
      JSON.stringify({ featuredPost: filteredPost }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong!' }),
      { status: 500 }
    );
  }
};
