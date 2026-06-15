import { AuthCard } from "@/components/auth/AuthCard";
import { RecoverForm } from "@/components/forms/auth/RecoverForm";
function RecoverPage() {
  return <AuthCard title="Recover Password" subtitle="AI-O HOME Marketplace" icon="lock_reset"><RecoverForm /></AuthCard>;
}
export {
  RecoverPage
};
