import LoginForm from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <div className="w-full h-screen bg-theme overflow-hidden flex justify-center items-center">
      <div className="rounded-xl border bg-card text-card-foreground shadow p-8">
        <LoginForm />
      </div>
    </div>
  );
}
