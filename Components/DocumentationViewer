import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  BookOpen, 
  Code2, 
  ArrowLeft, 
  Copy, 
  Check,
  Sparkles,
  ExternalLink,
  Play
} from "lucide-react";
import { base44 } from "@/api/base44Client";
import { cn } from "@/lib/utils";

// Playground URLs for different languages
const getPlaygroundUrl = (language, code) => {
  const encodedCode = encodeURIComponent(code);
  const base64Code = btoa(code);
  
  const playgrounds = {
    javascript: `https://playcode.io/new?code=${encodedCode}`,
    typescript: `https://www.typescriptlang.org/play?#code/${base64Code}`,
    python: `https://www.online-python.com/?code=${encodedCode}`,
    rust: `https://play.rust-lang.org/?code=${encodedCode}`,
    go: `https://go.dev/play/`,
    java: `https://www.jdoodle.com/online-java-compiler`,
    csharp: `https://dotnetfiddle.net/`,
    cpp: `https://www.onlinegdb.com/online_c++_compiler`,
    ruby: `https://try.ruby-lang.org/`,
    php: `https://onlinephp.io/`,
    swift: `https://swiftfiddle.com/`,
    kotlin: `https://play.kotlinlang.org/`,
    react: `https://codesandbox.io/s/new?file=/src/App.js`,
    vue: `https://play.vuejs.org/`,
    node: `https://runkit.com/new`,
    sql: `https://sqliteonline.com/`,
  };
  
  const langKey = language.toLowerCase().replace('#', 'sharp').replace('++', 'pp');
  return playgrounds[langKey] || `https://replit.com/languages/${langKey}`;
};

const getPlaygroundName = (language) => {
  const names = {
    javascript: "PlayCode",
    typescript: "TS Playground",
    python: "Online Python",
    rust: "Rust Playground",
    go: "Go Playground",
    java: "JDoodle",
    csharp: ".NET Fiddle",
    cpp: "OnlineGDB",
    ruby: "Try Ruby",
    php: "Online PHP",
    swift: "Swift Fiddle",
    kotlin: "Kotlin Playground",
    react: "CodeSandbox",
    vue: "Vue Playground",
    node: "RunKit",
    sql: "SQLite Online",
  };
  
  const langKey = language.toLowerCase().replace('#', 'sharp').replace('++', 'pp');
  return names[langKey] || "Replit";
};

export default function DocumentationViewer({ language, onBack }) {
  const [topic, setTopic] = useState("");
  const [documentation, setDocumentation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  const openInPlayground = (code) => {
    const url = getPlaygroundUrl(language, code);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const fetchDocumentation = async (searchTopic) => {
    if (!searchTopic.trim()) return;
    
    setIsLoading(true);
    setDocumentation(null);
    
    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a documentation expert. Provide comprehensive, well-structured documentation for the following topic in ${language}:

Topic: ${searchTopic}

Please include:
1. A clear explanation of what this is
2. Syntax and usage examples with code snippets
3. Common use cases
4. Best practices and tips
5. Related concepts or functions

Format your response in Markdown with proper headings, code blocks (use \`\`\`${language.toLowerCase()}\`\`\` for code), and bullet points where appropriate.`,
      add_context_from_internet: true,
    });
    
    setDocumentation(result);
    if (!searchHistory.includes(searchTopic)) {
      setSearchHistory(prev => [searchTopic, ...prev].slice(0, 5));
    }
    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchDocumentation(topic);
  };

  const copyCode = async (code, index) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(index);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const suggestedTopics = {
    javascript: ["async/await", "Array methods", "Promises", "Closures", "ES6 features"],
    python: ["List comprehensions", "Decorators", "Context managers", "Type hints", "Lambda functions"],
    rust: ["Ownership", "Borrowing", "Pattern matching", "Traits", "Error handling"],
    go: ["Goroutines", "Channels", "Interfaces", "Defer", "Error handling"],
    typescript: ["Generics", "Type guards", "Utility types", "Decorators", "Modules"],
    java: ["Streams API", "Lambda expressions", "Collections", "Generics", "Annotations"],
    csharp: ["LINQ", "Async/Await", "Generics", "Delegates", "Extension methods"],
    cpp: ["Smart pointers", "Templates", "STL containers", "Move semantics", "RAII"],
    ruby: ["Blocks", "Procs", "Metaprogramming", "Mixins", "Symbols"],
    php: ["Namespaces", "Traits", "Anonymous functions", "PDO", "Composer"],
    swift: ["Optionals", "Closures", "Protocols", "Extensions", "Generics"],
    kotlin: ["Coroutines", "Extension functions", "Data classes", "Sealed classes", "Null safety"],
    react: ["Hooks", "Context API", "useEffect", "Custom hooks", "Component lifecycle"],
    vue: ["Composition API", "Reactivity", "Directives", "Slots", "Provide/Inject"],
    node: ["Event loop", "Streams", "File system", "Modules", "Express middleware"],
    sql: ["JOINs", "Subqueries", "Window functions", "Indexes", "Transactions"],
  };

  const topics = suggestedTopics[language.toLowerCase()] || ["Getting started", "Basic syntax", "Functions", "Classes", "Best practices"];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="h-full flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white capitalize">
              {language} Documentation
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Search any topic or concept
            </p>
          </div>
        </div>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={`Search ${language} documentation...`}
            className="pl-12 pr-24 h-14 rounded-2xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-lg"
          />
          <Button
            type="submit"
            disabled={isLoading || !topic.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </form>

      {/* Suggested Topics */}
      {!documentation && !isLoading && (
        <div className="mb-6">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">
            Popular topics
          </p>
          <div className="flex flex-wrap gap-2">
            {topics.map((t) => (
              <Badge
                key={t}
                variant="secondary"
                className="px-4 py-2 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors rounded-full"
                onClick={() => {
                  setTopic(t);
                  fetchDocumentation(t);
                }}
              >
                {t}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Search History */}
      {searchHistory.length > 0 && !documentation && !isLoading && (
        <div className="mb-6">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">
            Recent searches
          </p>
          <div className="flex flex-wrap gap-2">
            {searchHistory.map((t) => (
              <Badge
                key={t}
                variant="outline"
                className="px-4 py-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors rounded-full"
                onClick={() => {
                  setTopic(t);
                  fetchDocumentation(t);
                }}
              >
                {t}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex-1 space-y-4">
          <Skeleton className="h-8 w-3/4 rounded-lg" />
          <Skeleton className="h-4 w-full rounded-lg" />
          <Skeleton className="h-4 w-5/6 rounded-lg" />
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-4 w-full rounded-lg" />
          <Skeleton className="h-4 w-4/5 rounded-lg" />
        </div>
      )}

      {/* Documentation Content */}
      <AnimatePresence mode="wait">
        {documentation && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 overflow-hidden"
          >
            <ScrollArea className="h-[calc(100vh-320px)]">
              <div className="pr-4">
                <ReactMarkdown
                  className="prose prose-slate dark:prose-invert max-w-none"
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-6 mb-4 first:mt-0">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mt-6 mb-3 flex items-center gap-2">
                        <Code2 className="w-5 h-5 text-indigo-500" />
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-lg font-medium text-slate-700 dark:text-slate-200 mt-4 mb-2">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside space-y-2 mb-4 text-slate-600 dark:text-slate-300">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside space-y-2 mb-4 text-slate-600 dark:text-slate-300">
                        {children}
                      </ol>
                    ),
                    code: ({ inline, className, children, ...props }) => {
                      const codeString = String(children).replace(/\n$/, '');
                      const codeIndex = codeString.substring(0, 20);
                      
                      if (inline) {
                        return (
                          <code className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 text-sm font-mono">
                            {children}
                          </code>
                        );
                      }
                      
                      return (
                        <div className="relative group my-4">
                          {/* Code block header */}
                          <div className="flex items-center justify-between bg-slate-800 dark:bg-slate-900 rounded-t-xl px-4 py-2 border-b border-slate-700">
                            <div className="flex items-center gap-2">
                              <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                              </div>
                              <span className="text-xs text-slate-400 ml-2 font-mono">
                                {language.toLowerCase()}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyCode(codeString, codeIndex)}
                                className="h-7 px-2 rounded-md hover:bg-slate-700 text-slate-400 hover:text-slate-200"
                              >
                                {copiedCode === codeIndex ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 mr-1 text-green-400" />
                                    <span className="text-xs text-green-400">Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5 mr-1" />
                                    <span className="text-xs">Copy</span>
                                  </>
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => openInPlayground(codeString)}
                                className="h-7 px-2 rounded-md hover:bg-indigo-600 text-slate-400 hover:text-white bg-indigo-500/20"
                              >
                                <Play className="w-3.5 h-3.5 mr-1" />
                                <span className="text-xs">Try in {getPlaygroundName(language)}</span>
                              </Button>
                            </div>
                          </div>
                          <pre className="bg-slate-900 dark:bg-slate-950 rounded-b-xl p-4 overflow-x-auto">
                            <code className="text-sm font-mono text-slate-100" {...props}>
                              {children}
                            </code>
                          </pre>
                        </div>
                      );
                    },
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-500 hover:text-indigo-600 underline underline-offset-2 inline-flex items-center gap-1"
                      >
                        {children}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-indigo-500 pl-4 my-4 text-slate-600 dark:text-slate-400 italic">
                        {children}
                      </blockquote>
                    ),
                  }}
                >
                  {documentation}
                </ReactMarkdown>
              </div>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {!documentation && !isLoading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/30 dark:to-violet-900/30 flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-indigo-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Search for documentation
            </h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm">
              Enter a topic, function, or concept to get detailed documentation with examples
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
