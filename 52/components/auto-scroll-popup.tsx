"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface AutoScrollPopupProps {
  title: string
  description?: string
  content: string
  submitButtonText?: string
  onSubmit: () => void
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AutoScrollPopup({
  title,
  description,
  content,
  submitButtonText = "Submit",
  onSubmit,
  open,
  onOpenChange,
}: AutoScrollPopupProps) {
  const [scrollComplete, setScrollComplete] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (open && contentRef.current) {
      setScrollComplete(false);
      const scrollableElement = contentRef.current;
      scrollableElement.scrollTop = 0; // Reset scroll to top

      setTimeout(() => {
        const scrollHeight = scrollableElement.scrollHeight - scrollableElement.clientHeight;
        let currentScroll = 0;
        const duration = 3000; // Total time in ms to reach the bottom
        const steps = duration / 10; // Number of steps
        const stepSize = scrollHeight / steps; // Pixels per step

        scrollIntervalRef.current = setInterval(() => {
          if (!scrollableElement) return;

          currentScroll += stepSize;
          scrollableElement.scrollTop = currentScroll;

          if (currentScroll >= scrollHeight) {
            clearInterval(scrollIntervalRef.current!);
            setScrollComplete(true);
          }
        }, 10); // Smooth scrolling every 10ms
      }, 500);
    }

    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div
          ref={contentRef}
          className="max-h-[50vh] overflow-y-auto border rounded-md p-4 my-4"
          style={{ pointerEvents: scrollComplete ? "auto" : "none" }}
        >
          {content.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
        <DialogFooter>
          <Button
            onClick={onSubmit}
            disabled={!scrollComplete}
            className={!scrollComplete ? "opacity-50 cursor-not-allowed" : ""}
          >
            {submitButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
