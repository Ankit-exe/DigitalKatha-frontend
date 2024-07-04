import { z } from "zod";
import "../index.css";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Alert, Spinner } from "flowbite-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

//SCHEMA DEFINE

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("This is not valid email."),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

//props

type SchemaProps = z.infer<typeof formSchema>;

export const Contact = () => {
  // form state
  const [formSubmitted, setFormSubmitted] = useState<Boolean>(false);

  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state: any) => state.user);
  const navigate = useNavigate();

  //react query

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SchemaProps>({
    resolver: zodResolver(formSchema),
  });

  // on Submit fnx

  const onSubmit = async (formdata: SchemaProps) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/contact/sendmessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formdata),
      });
      if (res.ok) {
        setFormSubmitted(true);
        setLoading(false);
        reset();
      }
      if (!res.ok) {
        setFormSubmitted(false);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen mb-20 relative px-2 overflow-hidden">
      {formSubmitted && (
        <Alert
          color="success"
          className="fixed z-50 right-0"
          onDismiss={() => setFormSubmitted(false)}
        >
          <span className="font-medium">Message sent successfully!</span>
        </Alert>
      )}
      <div className="text-center text-4xl  font-semibold flex flex-col py-20 gap-3">
        <motion.span
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contact <span className="text-pink-500">us</span>
        </motion.span>
        <motion.span
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          We'll <span className="text-pink-500">glad</span> to hear from you.
        </motion.span>
      </div>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full justify-center flex"
      >
        {/* FORM CONTAINER */}

        <div className="p-5 flex flex-col justify-center content-center items-center  w-full md:w-auto z-10 rounded-xl shadow-xl bg-gray-100 dark:bg-slate-700">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5  w-[80%] md:w-[500px]"
          >
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-sm">Your name :</label>
              <input
                type="text"
                className="border-2 border-border-gray rounded-lg h-9 px-2"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-700">{errors.name.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold text-sm">Email :</label>
              <input
                type="email"
                className="border-2 border-border-gray rounded-lg h-9 px-2"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-700">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-sm">Subject :</label>
              <input
                type="text"
                className="border-2 border-border-gray rounded-lg h-9 px-2"
                {...register("subject")}
              />
              {errors.subject && (
                <p className="text-red-700">{errors.subject.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-sm">Message :</label>
              <textarea
                className="border-2  border-border-gray rounded-lg min-h-40 max-h-60 p-2"
                {...register("message")}
              />
              {errors.message && (
                <p className="text-red-700">{errors.message.message}</p>
              )}
            </div>
            {currentUser ? (
              <button
                type="submit"
                className="bg-purple text-white py-2 rounded-lg bg-pink-500 hover:bg-pink-400 duration-150"
              >
                {loading && <Spinner />}
                Send
              </button>
            ) : (
              <button
                className="bg-purple text-white py-2 rounded-lg bg-pink-500 hover:bg-pink-400 duration-150"
                onClick={() => navigate("/sign-in")}
              >
                {loading && <Spinner />}
                Sign In to contact
              </button>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
};
