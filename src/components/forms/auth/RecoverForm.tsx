import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import type { RecoverRequest } from '@/types/auth.types';
import { useAuth } from '@/hooks/useAuth';
import { Input, Button } from '@/components/ui';

export function RecoverForm() {
  const { register, handleSubmit } = useForm<RecoverRequest>();
  const { recover } = useAuth();
  const [sent, setSent] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    await recover(data);
    setSent(true);
  });

  return (
    <>
      <form className="flex flex-col gap-4 w-full" onSubmit={onSubmit}>
        <Input label="Email" type="email" placeholder="Registered email" {...register('email', { required: true })} />
        <Button type="submit" className="rounded-xl mt-2 px-6 py-3 text-sm">Send link</Button>
      </form>
      {sent ? (
        <div className="text-primary mt-2 text-center font-bold">
          If the email is registered, you will receive instructions to reset your password.
        </div>
      ) : null}
      <div className="w-full flex flex-col items-center mt-2">
        <Link to="/auth/login" className="text-primary text-xs font-bold hover:underline">Back to login</Link>
      </div>
    </>
  );
}