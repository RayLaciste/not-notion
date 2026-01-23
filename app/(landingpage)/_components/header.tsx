"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import Link from "next/link";

export const Header = () => {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        <span className="underline">Note-ish .</span>
      </h1>
      <h3 className="text-base md:text-xl sm:text-2xl font-medium">
        This is absolutely <span className="italic">not</span> Notion <br />
        But it&apos;s trying
      </h3>
      <Button>
        <Link href="/documents">Enter Note-ish</Link>
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};
