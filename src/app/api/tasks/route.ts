"use server";

import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/authOptions";
// CREATE A TASK
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return new Response(JSON.stringify({ message: "Not authenticated" }), {
      status: 401,
    });
  }

  const body = await req.json();
  const { title } = body;

  if (!title || typeof title !== "string") {
    return new Response(JSON.stringify({ message: "Invalid title" }), {
      status: 400,
    });
  }

  try {
    const task = await prisma.task.create({
      data: {
        title,
        user: {
          connect: {
            email: session.user.email,
          },
        },
      },
    });

    return new Response(JSON.stringify(task), { status: 200 });
  } catch (error) {
    console.error("Error adding task:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}

// GET ALL TASKS
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return new Response(JSON.stringify({ message: "Not authenticated" }), {
      status: 401,
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const tasks = await prisma.task.findMany({
      where: {
        userId: user.id,
      },
    });

    return new Response(JSON.stringify(tasks), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
