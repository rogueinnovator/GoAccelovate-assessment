// app/api/tasks/[id]/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
//UPDATE A TASK
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return new Response(JSON.stringify({ message: "Not authenticated" }), {
      status: 401,
    });
  }
  const { id } = params;
  const body = await req.json();
  const { title } = body;
  if (!id || !title || typeof title !== "string") {
    return new Response(JSON.stringify({ message: "Invalid input" }), {
      status: 400,
    });
  }
  try {
    const task = await prisma.task.update({
      where: { id },
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
    console.error("Error updating task:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
//DELETE THE TASK
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return new Response(JSON.stringify({ message: "Not authenticated" }), {
      status: 401,
    });
  }

  const { id } = params;

  if (!id) {
    return new Response(JSON.stringify({ message: "Invalid task ID" }), {
      status: 400,
    });
  }

  try {
    await prisma.task.delete({
      where: { id },
    });

    return new Response(
      JSON.stringify({ message: "Task deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting task:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
