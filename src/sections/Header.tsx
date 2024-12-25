"use client";

import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { FaBars, FaX } from "react-icons/fa6";
import { useState } from "react";
import navLinks from "@/data/navLinks.json";
import { containerVars, menuVars, mobileLinkVars } from "@/data/animate";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen((prevOpen) => !prevOpen);
  const closeMenu = () => setOpen(false);

  return (
    <header className="select-none absolute top-0 left-0 w-full z-[100]">
      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="origin-top fixed z-[1000] top-0 left-0 h-screen w-screen bg-muted text-center font-semibold uppercase">
            <Button
              onClick={toggleMenu}
              variant="ghost"
              size="icon"
              className="absolute right-10 top-8 rounded-full active:scale-50 transition-transform duration-150 ease-in-out">
              <FaX />
            </Button>
            <motion.div
              variants={containerVars}
              initial="initial"
              animate="open"
              exit="initial"
              className="flex flex-col tracking-wide justify-center items-center h-full gap-6 sm:gap-8 md:gap-10 text-xl sm:text-2xl lg:text-3xl">
              {navLinks.map((link) => (
                <motion.div key={link.href} variants={mobileLinkVars}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="link"
                    rel="noopener noreferrer">
                    {link.title}
                  </Link>
                </motion.div>
              ))}
              <motion.span
                onClick={closeMenu}
                variants={mobileLinkVars}
                className="flex justify-center items-center gap-2 mt-4">
                <Button className="rounded-full" asChild>
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button variant="outline" className="rounded-full" asChild>
                  <Link href="/auth/register">Register</Link>
                </Button>
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Desktop Menu */}

      <nav className="p-4 md:p-8 relative top-2 left-1/2 transform -translate-x-1/2 w-[95vw] flex items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <div className="uppercase absolute left-1/2 transform -translate-x-1/2 lg:flex hidden gap-8 font-semibold items-baseline text-sm">
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className="link"
              rel="noopener noreferrer">
              {link.title}
            </Link>
          ))}
        </div>
        <div className="gap-2 flex justify-center items-center">
          <Button
            onClick={toggleMenu}
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full active:scale-50 transition-transform duration-150 ease-in-out">
            <FaBars />
          </Button>
          <span className="hidden md:flex justify-center items-center gap-2">
            <Button className="rounded-full" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button variant="outline" className="rounded-full" asChild>
              <Link href="/auth/register">Register</Link>
            </Button>
          </span>
        </div>
      </nav>
    </header>
  );
}
