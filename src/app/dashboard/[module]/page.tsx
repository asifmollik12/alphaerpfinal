import { modulesById, type ModuleId } from "@/lib/modules";
import { notFound } from "next/navigation";
import Link from "next/link";
import { redirect } from "next/navigation";

type ModuleDashboardPageProps = {
  params: {
    module: string;
  };
};

export default function ModuleDashboardPage({ params }: ModuleDashboardPageProps) {
  if (params.module === 'visa') {
    redirect('/dashboard/visa');
  }
  
  const moduleId = params.module as ModuleId;
  const module = modulesById[moduleId];

  if (!module) {
    notFound();
  }

  const { name, Icon } = module;

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center flex-grow">
      <Icon className="h-24 w-24 text-primary opacity-50 mb-6" />
      <h1 className="text-4xl font-bold tracking-tight text-foreground">
        Welcome to the {name} Dashboard
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        This is where the main interface for the {name} module would be. You can manage all your {name.toLowerCase()}-related tasks and data here.
      </p>
    </div>
  );
}

export function generateStaticParams() {
    const paths = Object.keys(modulesById).filter(id => id !== 'visa').map((id) => ({
        module: id
    }))
    return paths;
}