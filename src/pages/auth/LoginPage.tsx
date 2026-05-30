import { AuthCard } from '@/components/auth/AuthCard';
import { LoginForm } from '@/components/forms/auth/LoginForm';

export function LoginPage() {
  return (
    <AuthCard title="AI-O HOME" subtitle="Marketplace Login" icon="blur_on">
      <LoginForm />
    </AuthCard>
  );
}