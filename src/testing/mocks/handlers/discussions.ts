import { http, HttpResponse } from 'msw';

import { db } from '../db';
import { networkDelay } from '../utils';

import { env } from '@/config/env';
import { type Discussion, type Meta } from '@/types/api';

type CreateDiscussionBody = {
  title: string;
  body: string;
};

const PER_PAGE = 10;

export const discussionsHandlers = [
  http.get(`${env.API_URL}/discussions`, async ({ request }) => {
    await networkDelay();
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') ?? '1');
    const all = db.discussion.getAll() as Discussion[];
    const start = (page - 1) * PER_PAGE;
    const data = all.slice(start, start + PER_PAGE);
    const meta: Meta = {
      page,
      total: all.length,
      totalPages: Math.ceil(all.length / PER_PAGE) || 1,
    };
    return HttpResponse.json({ data, meta });
  }),

  http.get(`${env.API_URL}/discussions/:discussionId`, async ({ params }) => {
    await networkDelay();
    const discussion = db.discussion.findFirst({
      where: { id: { equals: String(params.discussionId) } },
    });
    if (!discussion) {
      return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    }
    return HttpResponse.json({ data: discussion });
  }),

  http.post(`${env.API_URL}/discussions`, async ({ request }) => {
    await networkDelay();
    const body = (await request.json()) as CreateDiscussionBody;
    const created = db.discussion.create({
      title: body.title,
      body: body.body,
      author: 'You',
    });
    return HttpResponse.json(created, { status: 201 });
  }),
];
