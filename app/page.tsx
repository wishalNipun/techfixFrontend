"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// Update this to point to your backend server base URL
const BASE_URL = "http://localhost:8080/api/users";

export default function LoginRegisterPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const router = useRouter();

  // Handle changes in input fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(""); // Clear any previous message

    try {
      // Decide endpoint based on whether we are registering or logging in
      const endpoint = isRegistering ? "/register" : "/login";
      const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // If response is not OK, throw an error to display
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }

      // If successful, get the text from response
      const data = await res.text();
      setMessage(data);
      setIsLoggedIn(true);
    } catch (error: any) {
      setMessage(error.message || "Something went wrong");
    }
  };

  // If user is logged in, show a placeholder or redirect to main content
  if (isLoggedIn) {
    router.push("/dashboard");
  }

  // If user is NOT logged in, show login/register form
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            {isRegistering ? "Register" : "Login"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Display any error or success messages */}
          {message && (
            <div className="mb-4 p-2 text-center text-sm text-red-500">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              {isRegistering ? "Register" : "Login"}
            </Button>
          </form>

          <div className="text-center mt-4">
            {isRegistering ? (
              <p>
                Already have an account?{" "}
                <Button
                  variant="link"
                  onClick={() => setIsRegistering(false)}
                  className="text-blue-600 px-2"
                >
                  Login
                </Button>
              </p>
            ) : (
              <p>
                Don&apos;t have an account?{" "}
                <Button
                  variant="link"
                  onClick={() => setIsRegistering(true)}
                  className="text-blue-600 px-2"
                >
                  Register
                </Button>
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
