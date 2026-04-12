import Link from 'next/link';
import { SignupForm } from '@/components/auth/SignupForm';
import { Logo } from '@/components/Logo';

export default function SignupPage() {
  return (
    <div className="light">
      <main className="flex-grow flex items-center justify-center p-4 bg-background min-h-screen">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Logo />
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
              Create an Account
            </h1>
            <p className="mt-2 text-muted-foreground">
              Start your journey with ModuleMart
            </p>
          </div>
          <SignupForm />
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/" className="font-medium text-primary hover:underline underline-offset-4">
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
