import prisma from '@/utils/connect';
import { NextResponse } from 'next/server';

const popularSlugs = [
  '100940_understanding_culture_the_fabric_of_human_societies',
  '170138_exploring_the_world_the_joys_and_benefits_of_travel',
  '180660_first_travel_post',
  '156019_third_culture_post',
];

export const GET = async () => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: { select: { name: true } }, // Include the user relation with name field selected
      },
    });

    const editorsPick = posts.filter(post =>
      popularSlugs.includes(post.slug)
    );

    const filteredPosts = editorsPick.map(post => ({
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
