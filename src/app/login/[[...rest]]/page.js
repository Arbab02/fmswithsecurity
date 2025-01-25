import { SignIn } from '@clerk/nextjs';

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn routing="path" path="/login" afterSignInUrl="/Dashboard"  />
    </div>
  );
}