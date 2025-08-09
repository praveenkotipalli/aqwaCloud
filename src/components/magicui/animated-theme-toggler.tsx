// "use client";

// import { Moon, SunDim } from "lucide-react";
// import { useState, useRef, useEffect } from "react";
// import { flushSync } from "react-dom";
// import { cn } from "@/lib/utils";

// type props = {
//   className?: string;
// };

// export const AnimatedThemeToggler = ({ className }: props) => {
//   const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
//   const [mounted, setMounted] = useState(false);
//   const buttonRef = useRef<HTMLButtonElement | null>(null);

//   // Initialize theme state on mount
//   useEffect(() => {
//     const isDark = document.documentElement.classList.contains("dark");
//     setIsDarkMode(isDark);
//     setMounted(true);
//   }, []);

//   // Prevent hydration mismatch
//   if (!mounted) {
//     return null;
//   }
  
//   const changeTheme = async () => {
//     if (!buttonRef.current) return;

//     // Check if View Transitions API is supported
//     if (!document.startViewTransition) {
//       console.log("View Transitions API not supported, using fallback");
//       const dark = document.documentElement.classList.toggle("dark");
//       setIsDarkMode(dark);
//       return;
//     }

//     try {
//       // Get button position before transition
//       const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
//       const x = left + width / 2;
//       const y = top + height / 2;

//       const endRadius = Math.hypot(
//         Math.max(left, window.innerWidth - left),
//         Math.max(top, window.innerHeight - top)
//       );

//       // Start the view transition
//       const transition = document.startViewTransition(() => {
//         flushSync(() => {
//           const dark = document.documentElement.classList.toggle("dark");
//           setIsDarkMode(dark);
//         });
//       });

//       // Wait for transition to be ready
//       await transition.ready;

//       // Animate the transition
//       document.documentElement.animate(
//         {
//           clipPath: [
//             `circle(0px at ${x}px ${y}px)`,
//             `circle(${endRadius}px at ${x}px ${y}px)`,
//           ],
//         },
//         {
//           duration: 600,
//           easing: "ease-in-out",
//           pseudoElement: "::view-transition-new(root)",
//         }
//       );
//     } catch (error) {
//       console.error("View transition animation failed:", error);
//       // Fallback: just toggle the theme without animation
//       const dark = document.documentElement.classList.toggle("dark");
//       setIsDarkMode(dark);
//     }
//   };

//   return (
//     <button 
//       ref={buttonRef} 
//       onClick={changeTheme} 
//       className={cn(
//         "inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors",
//         "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100",
//         "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800",
//         "border border-gray-200 dark:border-gray-700",
//         "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
//         className
//       )}
//       aria-label="Toggle theme"
//     >
//       {isDarkMode ? <SunDim className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
//     </button>
//   );
// };
"use client";

import { Moon, SunDim } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { flushSync } from "react-dom";
import { cn } from "@/lib/utils";

type props = { className?: string };

export const AnimatedThemeToggler = ({ className }: props) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setMounted(true);
    setIsDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  if (!mounted) return null;

  const changeTheme = async () => {
    if (!buttonRef.current) return;

    // center of the button
    const rect = buttonRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // radius to farthest corner FROM the center
    const maxRad = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // If the API isn't supported, fallback
    if (!document.startViewTransition) {
      const dark = document.documentElement.classList.toggle("dark");
      setIsDarkMode(dark);
      return;
    }

    try {
      // toggle snapshot inside the transition callback
      const transition = document.startViewTransition(() => {
        flushSync(() => {
          const dark = document.documentElement.classList.toggle("dark");
          setIsDarkMode(dark);
        });
      });

      // wait for snapshots to be ready
      await (transition as any).ready;

      // keyframes for new (expand) and old (shrink)
      const newKeyframes = [
        { clipPath: `circle(0px at ${x}px ${y}px)` },
        { clipPath: `circle(${maxRad}px at ${x}px ${y}px)` },
      ];
      const oldKeyframes = [
        { clipPath: `circle(${maxRad}px at ${x}px ${y}px)` },
        { clipPath: `circle(0px at ${x}px ${y}px)` },
      ];

      const opts = {
        duration: 700,
        easing: "ease-in-out",
      };

      // IMPORTANT: pseudoElement isn't typed in all TS libs — cast to any
      const animNew = (document.documentElement as any).animate(newKeyframes, {
        ...opts,
        pseudoElement: "::view-transition-new(root)",
      } as any);
      const animOld = (document.documentElement as any).animate(oldKeyframes, {
        ...opts,
        pseudoElement: "::view-transition-old(root)",
      } as any);

      // wait for both to finish (safe)
      await Promise.all([animNew.finished, animOld.finished]);
    } catch (err) {
      console.error("View transition failed — falling back:", err);
      const dark = document.documentElement.classList.toggle("dark");
      setIsDarkMode(dark);
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={changeTheme}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors",
        "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100",
        "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800",
        "border border-gray-200 dark:border-gray-700",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        className
      )}
      aria-label="Toggle theme"
    >
      {isDarkMode ? <SunDim className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
};
