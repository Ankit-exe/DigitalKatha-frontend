import { z } from "zod";
import "../index.css";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

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
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formdata, setFormData] = useState();
  const [loading, setLoading] = useState(false);

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
    } catch (error) {
        
    }
    setFormSubmitted(true);
    reset();
  };

  return (
    <div className="h-screen mb-20">
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
        className="w-full justify-center flex absolute"
      >
        {/* FORM CONTAINER */}

        <div className="p-10  z-10 rounded-xl shadow-xl bg-gray-100 dark:bg-slate-700">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 md:w-[500px]"
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

            <button
              type="submit"
              className="bg-purple text-white py-2 rounded-lg bg-pink-500 hover:bg-pink-400 duration-150"
            >
              Send
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
