import Link from 'next/link';
import { LoginForm } from '@/components/auth/LoginForm';
import { Logo } from '@/components/Logo';

export default function LoginPage() {
  return (
    <div className="light">
      <main className="flex-grow flex items-center justify-center p-4 bg-background min-h-screen">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Logo />
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-[#343364]">
              Welcome Back
            </h1>
            <p className="mt-2 text-muted-foreground">
              Sign in to access your modules
            </p>
          </div>
          <LoginForm />
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/signup" className="font-medium text-primary hover:underline underline-offset-4">
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
