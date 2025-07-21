import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import Hero from "@/components/hero";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-7xl mx-auto flex justify-between items-center p-3 px-5 text-sm">
          <div className="flex gap-5 items-center font-semibold">
            <Link href={"/"}>Eleetsquad</Link>
            <ThemeSwitcher />
          </div>
          {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
        </div>
      </nav>

      <div className="flex-1">
        <Hero />
      </div>

      <footer className="fixed bottom-0 w-full bg-white/80 dark:bg-black/80 backdrop-blur-sm border-t border-t-foreground/10">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-center text-center text-xs gap-8 py-4">
          <p>Powered by{" "} Priyans</p>
        </div>
      </footer>
    </main>
  );
}
