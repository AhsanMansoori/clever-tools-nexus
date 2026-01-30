import { motion } from "framer-motion";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { forwardRef } from "react";

interface AnimatedButtonProps extends ButtonProps {
  showArrow?: boolean;
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, className, showArrow = false, ...props }, ref) => {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Button
          ref={ref}
          className={cn("group relative overflow-hidden", className)}
          {...props}
        >
          <span className="relative z-10 flex items-center gap-2">
            {children}
            {showArrow && (
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            )}
          </span>
        </Button>
      </motion.div>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";
