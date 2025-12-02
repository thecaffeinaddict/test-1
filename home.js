import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Search, 
  Code2, 
  Sparkles,
  Terminal,
  Braces,
  FileCode2
} from "lucide-react";
import LanguageCard from "@/components/LanguageCard";
import DocumentationViewer from "@/components/DocumentationViewer";

const languages = [
  { name: "JavaScript", icon: "JS" },
  { name: "Python", icon: "PY" },
  { name: "TypeScript", icon: "TS" },
  { name: "Rust", icon: "RS" },
  { name: "Go", icon: "GO" },
  { name: "Java", icon: "JV" },
  { name: "C#", icon: "C#" },
  { name: "C++", icon: "++" },
  { name: "Ruby", icon: "RB" },
  { name: "PHP", icon: "HP" },
  { name: "Swift", icon: "SW" },
  { name: "Kotlin", icon: "KT" },
  { name: "React", icon: "RE" },
  { name: "Vue", icon: "VU" },
  { name: "Node", icon: "ND" },
  { name: "SQL", icon: "SQ" },
];

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [searchFilter, setSearchFilter] = useState("");

  const filteredLanguages = languages.filter(lang =>
    lang.name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200/30 dark:bg-indigo-800/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-200/30 dark:bg-violet-800/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-100/20 to-violet-100/20 dark:from-indigo-900/10 dark:to-violet-900/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          {!selectedLanguage ? (
            <motion.div
              key="language-selector"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Header */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 mb-6">
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    AI-Powered Documentation
                  </span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4">
                  <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                    Code Docs
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
                  Instant documentation for any programming language. 
                  Search concepts, functions, and best practices.
                </p>

                {/* Stats */}
                <div className="flex items-center justify-center gap-8 mb-8">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Terminal className="w-5 h-5 text-indigo-500" />
                    <span className="text-sm font-medium">{languages.length}+ Languages</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Braces className="w-5 h-5 text-violet-500" />
                    <span className="text-sm font-medium">Real-time Search</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <FileCode2 className="w-5 h-5 text-purple-500" />
                    <span className="text-sm font-medium">Code Examples</span>
                  </div>
                </div>
              </motion.div>

              {/* Search */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-xl mx-auto mb-10"
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="Search languages..."
                    className="pl-12 h-14 rounded-2xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 text-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </motion.div>

              {/* Language Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredLanguages.map((lang, index) => (
                    <motion.div
                      key={lang.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.03 }}
                    >
                      <LanguageCard
                        language={lang.name}
                        icon={lang.icon}
                        onClick={() => setSelectedLanguage(lang.name)}
                        isSelected={selectedLanguage === lang.name}
                      />
                    </motion.div>
                  ))}
                </div>

                {filteredLanguages.length === 0 && (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                      <Code2 className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">
                      No languages found
                    </h3>
                    <p className="text-slate-500">
                      Try searching for a different language
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Footer Note */}
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center text-sm text-slate-500 dark:text-slate-400 mt-12"
              >
                Select a language to start exploring its documentation
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="documentation-viewer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-slate-900/50 p-6 sm:p-8 min-h-[80vh]"
            >
              <DocumentationViewer
                language={selectedLanguage}
                onBack={() => setSelectedLanguage(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
