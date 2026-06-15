import { AuthCard } from "@/components/auth/AuthCard";
import { RegisterForm } from "@/components/forms/auth/RegisterForm";
function RegisterPage() {
  return <AuthCard title="Create Account" subtitle="AI-O HOME Marketplace" icon="person_add"><RegisterForm /></AuthCard>;
}
export {
  RegisterPage
};
