import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Input, Button } from "@/components/ui";
function RegisterForm() {
  const { register, handleSubmit } = useForm();
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (data) => {
    await registerUser(data);
    navigate("/auth/login");
  });
  return <><form className="flex flex-col gap-4 w-full" onSubmit={onSubmit}><Input label="Username" placeholder="Username" {...register("username", { required: true })} /><Input label="Email" type="email" placeholder="Email" {...register("email", { required: true })} /><Input label="Password" type="password" placeholder="Password" {...register("password", { required: true })} /><Input label="First name" placeholder="First name" {...register("firstName")} /><Input label="Last name" placeholder="Last name" {...register("lastName")} /><Button type="submit" className="rounded-xl mt-2 px-6 py-3 text-sm">Create Account</Button></form><div className="w-full flex flex-col items-center mt-2"><Link to="/auth/login" className="text-primary text-xs font-bold hover:underline">Already have an account? Sign in</Link></div></>;
}
export {
  RegisterForm
};
