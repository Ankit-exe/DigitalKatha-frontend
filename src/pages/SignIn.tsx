import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import biglogo from "../assets/biglogo.png";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { OAuth } from "../components/OAuth";

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("This is not valid email."),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be at most 20 characters long"),
});
const API_BASE_URL = import.meta.env.VITE_BASE_URL;

type SchemaProps = z.infer<typeof formSchema>;

export const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: any) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaProps>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (formdata: SchemaProps) => {
    try {
      dispatch(signInStart());
      const res = await fetch(`${API_BASE_URL}/api/auth/signin`, {
        method: "POST",
        credentials:'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(signInFailure(data.message));
      } else {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error: any) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow mt-20 content-center">
        <div className="flex gap-10 px-3 max-w-3xl mx-auto flex-col md:flex-row">
          {/* left */}
          <div className="flex-1 content-center">
            <img src={biglogo} alt="digitalkatha" className="h-[120px]" />
            <p className="pt-5 text-gray-700">
              Sign in with your email and password or with Google.
            </p>
          </div>
          {/* right */}
          <div className="flex-1">
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
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
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner className="mr-3" /> Loading...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
              <OAuth />
            </form>
            <div className="flex gap-2 text-sm mt-5">
              <span>Dont have an account?</span>
              <Link to="/sign-up" className="text-blue-600 hover:underline">
                Sign-Up
              </Link>
            </div>
            {error && (
              <Alert className="mt-3.5" color="failure">
                {error}
              </Alert>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
