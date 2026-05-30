import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import type { LoginRequest } from '@/types/auth.types';
import { useAuth } from '@/hooks/useAuth';
import { Input, Button } from '@/components/ui';

export function LoginForm() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginRequest>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login(data);
      navigate(data.username === 'admin' ? '/admin/dashboard' : '/marketplace/home');
    } catch {
      setError('root', { message: 'Invalid credentials' });
    }
  });

  return (
    <>
      <form className="flex flex-col gap-4 w-full" onSubmit={onSubmit}>
        <Input label="Username" placeholder="Username" {...register('username', { required: true })} />
        <Input label="Password" type="password" placeholder="Password" {...register('password', { required: true })} />
        <Button type="submit" className="rounded-xl mt-2">Sign in</Button>
      </form>
      {errors.root?.message ? <div className="text-error mt-2 text-center font-bold">{errors.root.message}</div> : null}
      <div className="w-full flex flex-col items-center mt-2 gap-2">
        <Link to="/auth/recover" className="text-primary text-xs font-bold hover:underline">Forgot your password?</Link>
        <Link to="/auth/register" className="text-on-surface-variant text-xs hover:underline">Create a new account</Link>
      </div>
    </>
  );
}