import "./styles.css";
import React from "react";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string;
  confirmPassword: string;
}

export default function App() {
  const schema: ZodType<FormData> = z
    .object({
      firstName: z.string().min(2).max(30),
      lastName: z.string().min(2).max(30),
      email: z.string().email(),
      age: z.number().min(18).max(70),
      password: z.string().min(5).max(20),
      confirmPassword: z.string().min(5).max(20)
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"]
    });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });
  const submitData = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center mt-20 ">
      <form onSubmit={handleSubmit(submitData)} className="flex flex-col">
        <label> First Name: </label>
        <input type="text" className="rounded-md" {...register("firstName")} />
        {errors.firstName && (
          <span className="text-red-500"> {errors.firstName.message}</span>
        )}
        <label> Last Name: </label>
        <input type="text" className="rounded-md" {...register("lastName")} />
        {errors.lastName && (
          <span className="text-red-500"> {errors.lastName.message}</span>
        )}
        <label className=""> Email: </label>
        <input type="email" className="rounded-md" {...register("email")} />
        {errors.email && (
          <span className="text-red-500"> {errors.email.message}</span>
        )}
        <label> Age </label>
        <input
          type="number"
          className="rounded-md"
          {...register("age", { valueAsNumber: true })}
        />
        {errors.age && (
          <span className="text-red-500"> {errors.age.message}</span>
        )}
        <label> Password: </label>
        <input
          type="password"
          className="rounded-md"
          {...register("password")}
        />
        {errors.password && (
          <span className="text-red-500"> {errors.password.message}</span>
        )}
        <label> Confirm Password: </label>
        <input
          type="password"
          className="rounded-md"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <span className="text-red-500">
            {" "}
            {errors.confirmPassword.message}
          </span>
        )}

        <input
          type="submit"
          className="h-12 mt-6 rounded-lg bg-blue-700 cursor-pointer text-white outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform"
        />
      </form>
    </div>
  );
}
