import prisma from '@/utils/connect';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const Popularposts = await prisma.post.findMany({
      orderBy: { views: 'desc' },
      take: 3,
      include: {
        user: { select: { name: true } }, // Include the user relation with name field selected
      },
    });

    const filteredPosts = Popularposts.map(post => ({
      title: post.title,
      desc: post.desc,
      image: post.img,
      user: post.user.name,
      category: post.catSlug,
      date: post.createdAt,
    }));

    return new NextResponse(
      JSON.stringify({ posts: filteredPosts }, { status: 200 })
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong!' }, { status: 500 })
    );
  }
};
