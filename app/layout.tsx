import type { Metadata } from "next";
import "./globals.css";
import { inter } from "./fonts";
import { Header } from "@/components/header";

import { ToDoStoreProvider } from "@/provider/todo-store-provider";

export const metadata: Metadata = {
  title: "The Vertical Todo List",
  description:
    "Organize your tasks with ease using our Vertical Todo List. Add, edit, and delete items, reorder them with drag-and-drop, filter by completion status, and manage due dates—all in one intuitive interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex h-screen w-screen justify-center font-normal">
          <Header />
          <ToDoStoreProvider>{children}</ToDoStoreProvider>
        </main>
      </body>
    </html>
  );
}
