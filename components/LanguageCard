import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const languageColors = {
  javascript: "from-yellow-400 to-orange-500",
  python: "from-blue-400 to-green-500",
  rust: "from-orange-500 to-red-600",
  go: "from-cyan-400 to-blue-500",
  typescript: "from-blue-500 to-blue-700",
  java: "from-red-500 to-orange-600",
  csharp: "from-purple-500 to-violet-600",
  cpp: "from-blue-600 to-indigo-700",
  ruby: "from-red-500 to-pink-600",
  php: "from-indigo-400 to-purple-600",
  swift: "from-orange-400 to-red-500",
  kotlin: "from-purple-400 to-orange-500",
  react: "from-cyan-400 to-blue-500",
  vue: "from-green-400 to-emerald-600",
  node: "from-green-500 to-lime-600",
  sql: "from-blue-400 to-cyan-500",
};

export default function LanguageCard({ language, icon, onClick, isSelected }) {
  const gradientClass = languageColors[language.toLowerCase()] || "from-gray-400 to-gray-600";
  
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative group p-5 rounded-2xl border transition-all duration-300",
        "bg-white dark:bg-slate-900/50 backdrop-blur-sm",
        isSelected 
          ? "border-indigo-500 shadow-lg shadow-indigo-500/20" 
          : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
      )}
    >
      <div className={cn(
        "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300",
        `bg-gradient-to-br ${gradientClass}`
      )} />
      
      <div className="relative flex items-center gap-4">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg",
          `bg-gradient-to-br ${gradientClass}`
        )}>
          {icon}
        </div>
        <div className="text-left">
          <h3 className="font-semibold text-slate-900 dark:text-white capitalize">
            {language}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Documentation
          </p>
        </div>
      </div>
    </motion.button>
  );
}
