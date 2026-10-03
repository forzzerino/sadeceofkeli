import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface Tab {
  title: string;
  icon: LucideIcon;
}

interface ExpandableTabsProps {
  tabs: Tab[];
  activeTabIndex: number | null;
  onChange: (index: number) => void;
  className?: string;
  activeColor?: string;
}

export function ExpandableTabs({
  tabs,
  activeTabIndex,
  onChange,
  className,
  activeColor,
}: ExpandableTabsProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const buttonVariants = {
    animate: (isSelected: boolean) => ({
      gap: isSelected ? (isMobile ? ".25rem" : ".5rem") : 0,
      paddingLeft: isSelected ? (isMobile ? ".75rem" : "1rem") : (isMobile ? ".25rem" : ".5rem"),
      paddingRight: isSelected ? (isMobile ? ".75rem" : "1rem") : (isMobile ? ".25rem" : ".5rem"),
    }),
  };

  const spanVariants = {
    initial: { width: 0, opacity: 0 },
    animate: { width: "auto", opacity: 1 },
    exit: { width: 0, opacity: 0 },
  };

  const transition = { delay: 0.1, type: "spring" as const, bounce: 0, duration: 0.6 };

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-1 md:gap-2 rounded-xl md:rounded-2xl border p-1 shadow-sm",
        className
      )}
    >
      {tabs.map((tab, index) => {
        const Icon = tab.icon;
        const isSelected = activeTabIndex === index;
        return (
          <motion.button
            key={tab.title}
            variants={buttonVariants}
            initial={false}
            animate="animate"
            custom={isSelected}
            onClick={() => onChange(index)}
            transition={transition}
            className={cn(
              "relative flex items-center rounded-lg md:rounded-xl px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm font-medium transition-colors duration-300",
              isSelected ? activeColor : "hover:bg-mono-700/40 hover:text-mono-0"
            )}
          >
            <Icon className="w-4 h-4 md:w-5 md:h-5" />
            <AnimatePresence initial={false}>
              {isSelected && (
                <motion.span
                  variants={spanVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  className="overflow-hidden"
                >
                  {tab.title}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}
