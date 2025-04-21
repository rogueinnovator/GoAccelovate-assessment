"use client";
import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      router.push("/dashboard");
    } else {
      setError("Invalid email or password.");
    }

    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <Card className="w-full max-w-sm mx-auto p-4 sm:p-6 border-none shadow-md">
        <CardHeader className="space-y-1 p-0 pb-4 text-center">
          <CardTitle className="text-2xl font-semibold">Sign in</CardTitle>
          <CardDescription className="text-sm">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <form onSubmit={handleSubmit} className="space-y-3">
            {error && (
              <div className="text-sm text-red-500 font-medium -mt-2">
                {error}
              </div>
            )}

            {[
              {
                id: "email",
                type: "email",
                label: "Email",
                placeholder: "Enter email",
                value: email,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value),
              },
              {
                id: "password",
                type: "password",
                label: "Password",
                placeholder: "Enter password",
                value: password,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value),
              },
            ].map(({ id, type, label, placeholder, value, onChange }) => (
              <div key={id} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <Label htmlFor={id}>{label}</Label>
                </div>
                <Input
                  id={id}
                  type={type}
                  placeholder={placeholder}
                  value={value}
                  onChange={onChange}
                  required
                />
              </div>
            ))}

            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 p-0 pt-4 text-sm">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-2 text-muted-foreground text-xs">
                Or continue with
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full cursor-pointer"
            onClick={() => signIn("google")}
          >
            Continue with Google
          </Button>

          <div className="text-center">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-primary underline-offset-4 hover:underline"
            >
              Register
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
