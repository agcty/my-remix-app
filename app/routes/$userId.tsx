import { ActionArgs, json, LoaderArgs } from "@remix-run/node";
import { Form, useLoaderData, useParams } from "@remix-run/react";
import { db } from "~/db.server";

export async function loader({ params }: LoaderArgs) {
  console.log({ params });
  const post = await db.post.findMany({ where: { userId: params.userId } });
  return json({ post });
}

export async function action({ request, params }: ActionArgs) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const body = formData.get("body") as string;

  const userId = params.userId as string;
  await db.post.create({ data: { title, body, userId } });
  return true;
}

export default function Posts() {
  const data = useLoaderData<typeof loader>();
  const { userId } = useParams();

  return (
    <div>
      <Form method="post">
        <input type="text" name="title" placeholder="title" />
        <textarea name="body" placeholder="body" />
        <button type="submit">Submit</button>
      </Form>

      {data.post.map((p) => (
        <div>{JSON.stringify(p)}</div>
      ))}
    </div>
  );
}
