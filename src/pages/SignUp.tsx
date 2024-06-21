import { Label, TextInput, Button } from "flowbite-react";
import biglogo from "../assets/biglogo.png";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Toast } from "../components/Toast";
import { OAuth } from "../components/OAuth";

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("This is not valid email."),
  password: z.string().min(1, "Password is required"),
});

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

type SchemaProps = z.infer<typeof formSchema>;

export const SignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [toastMessage, setToastMessage] = useState({
    message: "",
    success: true,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaProps>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: SchemaProps) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        if (errorData && errorData.message) {
          setToastMessage({ message: errorData.message, success: false });
        } else {
          throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }
      } else {
        setToastMessage({
          message: "User Created Successfully",
          success: true,
        });
        navigate("/sign-in");
      }
    } catch (error: any) {
      console.error(error);
      setToastMessage({ message: error.message, success: false });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (toastMessage.message) {
      const timer = setTimeout(() => {
        setToastMessage({ message: "", success: true });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  return (
    <div className="flex flex-col min-h-screen">
      {toastMessage.message && (
        <Toast message={toastMessage.message} success={toastMessage.success} />
      )}
      <div className="flex-grow mt-20 content-center ">
        <div className="flex gap-10 px-3 max-w-3xl mx-auto flex-col md:flex-row">
          {/* left */}
          <div className="flex-1 content-center">
            <img src={biglogo} alt="digitalkatha" className="h-[120px]" />
            <p className="pt-5 text-gray-700">
              Sign up with your email and password or with Google.
            </p>
          </div>
          {/* right */}
          <div className="flex-1">
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <Label value="Your username" className="font-semibold" />
                <TextInput
                  type="text"
                  placeholder="Username"
                  id="username"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-red-600">{errors.username.message}</p>
                )}
              </div>
              <div>
                <Label value="Your email" className="font-semibold" />
                <TextInput
                  type="email"
                  placeholder="Email"
                  id="email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-600">{errors.email.message}</p>
                )}
              </div>
              <div>
                <Label value="Your password" className="font-semibold" />
                <TextInput
                  type="password"
                  placeholder="Password"
                  id="password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-600">{errors.password.message}</p>
                )}
              </div>
              <Button
                className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm text-center"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Sign Up"}
              </Button>
              <OAuth />
            </form>
            <div className="flex gap-2 text-sm mt-5">
              <span>Have an account?</span>
              <Link to="/sign-in" className="text-blue-600 hover:underline">
                Sign-In
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
