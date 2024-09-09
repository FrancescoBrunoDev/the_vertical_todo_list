import type { Metadata } from "next";
import "./globals.css";
import { body } from "./fonts";
import { Header } from "@/components/header";

import { ToDoStoreProvider } from "@/provider/todo-store-provider";
import { ThemeProvider } from "@/provider/theme-provider";
import { ModeToggle } from "@/components/modeTheme";
import { SelfHosted } from "@/components/selfhosted";

export const metadata: Metadata = {
  title: "The Vertical Todo List",
  description:
    "Organize your tasks with ease using The Vertical Todo List. Add, edit, and delete items, reorder them with drag-and-drop, filter by completion status, and manage due dates—all in one intuitive interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={body.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex h-screen w-screen justify-center font-normal">
            <ToDoStoreProvider>
              <ModeToggle className="fixed right-4 top-4 z-50" />
              <Header />
              {children}
            </ToDoStoreProvider>
            <SelfHosted />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
