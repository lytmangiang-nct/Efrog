import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  GraduationCap, 
  Trophy, 
  Home, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2, 
  XCircle,
  ArrowLeft,
  Menu,
  X,
  User,
  LogOut,
  Sparkles,
  Mail,
  Clock,
  Send,
  Coins,
  Flame,
  Search,
  Languages,
  Youtube,
  Newspaper,
  Music,
  Film,
  Award,
  Leaf,
  Mic,
  Volume2,
  Gamepad2,
  Dices,
  Image as ImageIcon,
  CheckCircle,
  MessageSquare
} from 'lucide-react';
import { FrogMascot } from './components/FrogMascot';
import { lessons, Lesson, Level } from './data/lessons';
import { quizzes, Quiz } from './data/quizzes';
import { cn } from './lib/utils';
import { checkAnswer } from './lib/answerChecker';

const LessonCard: React.FC<{ lesson: Lesson, onClick: () => void }> = ({ lesson, onClick }) => (
  <motion.div
    whileHover={{ x: 4 }}
    onClick={onClick}
    className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm cursor-pointer flex items-center justify-between hover:border-emerald-300 transition-all"
  >
    <div className="flex items-center gap-4">
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center",
        lesson.category === 'Grammar' ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600"
      )}>
        {lesson.category === 'Grammar' ? <BookOpen size={24} /> : <GraduationCap size={24} />}
      </div>
      <div>
        <h4 className="font-bold text-emerald-900">{lesson.title}</h4>
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 uppercase">
          {lesson.difficulty}
        </span>
      </div>
    </div>
    <ChevronRight className="text-emerald-300" />
  </motion.div>
);

type View = 'onboarding' | 'placement-test' | 'home' | 'lessons' | 'lesson-detail' | 'warmup' | 'quiz' | 'quiz-result' | 'store' | 'vocabulary-lookup' | 'entertainment-hub' | 'smart-translator' | 'notebook' | 'matching-quiz';

interface WarmupDrill {
  vocabulary: {
    matching: { word: string; definition: string }[];
    gapFill: { sentence: string; answer: string; options: string[] }[];
  };
  grammar: {
    errorIdentification: { sentence: string; error: string; correction: string; tip: string }[];
    sentenceTransformation: { original: string; prompt: string; answer: string; tip: string }[];
  };
}

interface StickyNote {
  id: string;
  word: string;
  phonetic: string;
  meaning: string;
  example: string;
  synonyms: string[];
  antonyms: string[];
  savedAt: string;
  needsPractice?: boolean;
}

interface TranslationResult {
  literal: string;
  idiomatic: string;
  grammarAnalysis: string;
  stickyNotes: StickyNote[];
}

interface UserProfile {
  email: string;
  nickname: string;
  level: Level;
  fullName: string;
  tadpoles: number;
  streak: number;
  lastLessonDate: string | null; // ISO date string
  inventory: string[];
  greenLotusLeaves: number;
  notebook: StickyNote[];
  hasSeenDay5Scenario?: boolean;
}

import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

interface VocabularyResult {
  word: string;
  phonetic: string;
  meaning: string;
  examples: { en: string; vi: string }[];
  synonyms: string[];
  antonyms: string[];
  frogTip: string;
}

interface EntertainmentHubContent {
  error?: string;
  news: {
    title: string;
    source: string;
    summary: string[];
    vocabulary: { word: string; meaning: string }[];
    url: string;
  };
  media: {
    title: string;
    type: string;
    youtubeUrl: string;
    quote: string;
    challenge: {
      question: string;
      type: 'rewrite' | 'explain';
      correctAnswer: string;
    };
  };
}

interface MatchingQuestion {
  word: string;
  phonetic: string;
  options: {
    definition: string;
    translation: string;
  }[];
  correctAnswer: number;
}

interface PlacementQuestion {
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  level: Level;
}

interface TutorMessage {
  role: 'user' | 'tutor';
  content: string;
}

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [currentView, setCurrentView] = useState<View>('onboarding');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<(number | string | null)[]>([]);
  const [quizResult, setQuizResult] = useState<{ score: number, total: number, correctCount: number, bonusTadpoles: number } | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(3600); // 60 minutes in seconds
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setCurrentView('quiz-result');
      setIsTimerActive(false);
    }
    return () => clearInterval(timer);
  }, [isTimerActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Vocabulary Lookup State
  const [lookupWord, setLookupWord] = useState('');
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [lookupResult, setLookupResult] = useState<VocabularyResult | null>(null);

  // Warmup State
  const [selectedWarmup, setSelectedWarmup] = useState<WarmupDrill | null>(null);
  const [isGeneratingWarmup, setIsGeneratingWarmup] = useState(false);
  const [warmupAnswers, setWarmupAnswers] = useState<{
    matching: string[]; // indices of definitions for each word
    gapFill: string[];
    errorId: string[];
    transformation: string[];
  }>({
    matching: Array(5).fill(''),
    gapFill: Array(3).fill(''),
    errorId: Array(3).fill(''),
    transformation: Array(2).fill(''),
  });
  const [isWarmupFinished, setIsWarmupFinished] = useState(false);
  const [warmupScore, setWarmupScore] = useState(0);
  const [showWarmupTips, setShowWarmupTips] = useState<boolean[]>(Array(13).fill(false));

  const handleStartWarmup = async () => {
    if (!selectedLesson || !user) return;
    setIsGeneratingWarmup(true);
    setCurrentView('warmup');
    setIsWarmupFinished(false);
    setWarmupAnswers({
      matching: Array(5).fill(''),
      gapFill: Array(3).fill(''),
      errorId: Array(3).fill(''),
      transformation: Array(2).fill(''),
    });

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Create a "Warm-up" drill for the English lesson: "${selectedLesson.title}".
        Level: ${user.level}.
        Content: ${selectedLesson.content}.
        
        Structure:
        1. Vocabulary: 5 matching pairs (word and definition), 3 contextual gap-fill sentences.
        2. Grammar: 3 error identification sentences (with error, correction, and quick tip), 2 sentence transformation exercises (with original, prompt, answer, and quick tip).
        
        Return JSON format.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              vocabulary: {
                type: Type.OBJECT,
                properties: {
                  matching: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        word: { type: Type.STRING },
                        definition: { type: Type.STRING }
                      },
                      required: ["word", "definition"]
                    }
                  },
                  gapFill: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        sentence: { type: Type.STRING, description: "Sentence with ___ for the blank" },
                        answer: { type: Type.STRING },
                        options: { type: Type.ARRAY, items: { type: Type.STRING } }
                      },
                      required: ["sentence", "answer", "options"]
                    }
                  }
                },
                required: ["matching", "gapFill"]
              },
              grammar: {
                type: Type.OBJECT,
                properties: {
                  errorIdentification: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        sentence: { type: Type.STRING },
                        error: { type: Type.STRING },
                        correction: { type: Type.STRING },
                        tip: { type: Type.STRING }
                      },
                      required: ["sentence", "error", "correction", "tip"]
                    }
                  },
                  sentenceTransformation: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        original: { type: Type.STRING },
                        prompt: { type: Type.STRING },
                        answer: { type: Type.STRING },
                        tip: { type: Type.STRING }
                      },
                      required: ["original", "prompt", "answer", "tip"]
                    }
                  }
                },
                required: ["errorIdentification", "sentenceTransformation"]
              }
            },
            required: ["vocabulary", "grammar"]
          }
        }
      });

      const result = JSON.parse(response.text || '{}');
      setSelectedWarmup(result);
    } catch (error) {
      console.error("Error generating warmup:", error);
    } finally {
      setIsGeneratingWarmup(false);
    }
  };

  const handleLookup = async () => {
    if (!lookupWord || !user) return;
    setIsLookingUp(true);
    setLookupResult(null);

    try {
      const prompt = `Bạn là Chuyên gia Từ vựng của Efrog. Hãy giải nghĩa từ/cụm từ "${lookupWord}" cho người dùng trình độ ${user.level}.
Yêu cầu:
1. Giải nghĩa ngắn gọn, dễ hiểu.
2. Cung cấp phiên âm chuẩn.
3. Đưa ra 3 ví dụ minh họa sinh động (không dùng ví dụ kinh điển), kèm dịch nghĩa.
4. Liệt kê từ đồng nghĩa và trái nghĩa.
5. "Frog Tip": Một mẹo nhỏ hoặc cách ghi nhớ từ này theo phong cách Efrog.

Return JSON:
{
  "word": "string",
  "phonetic": "string",
  "meaning": "string",
  "examples": [{"en": "string", "vi": "string"}],
  "synonyms": ["string"],
  "antonyms": ["string"],
  "frogTip": "string"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              word: { type: Type.STRING },
              phonetic: { type: Type.STRING },
              meaning: { type: Type.STRING },
              examples: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    en: { type: Type.STRING },
                    vi: { type: Type.STRING }
                  }
                }
              },
              synonyms: { type: Type.ARRAY, items: { type: Type.STRING } },
              antonyms: { type: Type.ARRAY, items: { type: Type.STRING } },
              frogTip: { type: Type.STRING }
            },
            required: ["word", "phonetic", "meaning", "examples", "synonyms", "antonyms", "frogTip"]
          }
        }
      });

      const data = JSON.parse(response.text || '{}');
      setLookupResult(data);
    } catch (error) {
      console.error("Error looking up word:", error);
    } finally {
      setIsLookingUp(false);
    }
  };

  const renderVocabularyLookup = () => (
    <div className="space-y-8 pb-20">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => setCurrentView('home')} className="p-2 hover:bg-emerald-50 rounded-full">
          <ArrowLeft className="w-6 h-6 text-emerald-700" />
        </button>
        <h2 className="text-2xl font-bold text-emerald-900">Tra Từ Vựng Efrog</h2>
      </div>

      <section className="bg-emerald-900 p-8 rounded-[40px] border-2 border-emerald-700 shadow-xl text-white space-y-6">
        <div className="flex items-center gap-4">
          <div className="bg-emerald-800 p-4 rounded-2xl">
            <Search className="text-emerald-400 w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-black">Từ Điển Thông Thái</h3>
            <p className="text-emerald-300">Tra cứu và học từ vựng theo phong cách Efrog</p>
          </div>
        </div>

        <div className="flex gap-3">
          <input 
            type="text"
            placeholder="Nhập từ hoặc cụm từ cần tra..."
            value={lookupWord}
            onChange={(e) => setLookupWord(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
            className="flex-1 px-6 py-4 rounded-2xl bg-emerald-800 border-2 border-emerald-700 focus:border-emerald-400 outline-none transition-all font-medium text-white placeholder:text-emerald-600"
          />
          <button 
            disabled={!lookupWord || isLookingUp}
            onClick={handleLookup}
            className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-800 disabled:text-emerald-600 text-emerald-950 px-8 rounded-2xl font-black transition-all shadow-lg flex items-center justify-center"
          >
            {isLookingUp ? (
              <div className="w-5 h-5 border-2 border-emerald-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Search size={24} />
            )}
          </button>
        </div>
      </section>

      <AnimatePresence mode="wait">
        {lookupResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-[40px] border-2 border-emerald-100 shadow-sm space-y-8"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-emerald-50 pb-6">
              <div>
                <h3 className="text-4xl font-black text-emerald-900">{lookupResult.word}</h3>
                <p className="text-xl font-bold text-emerald-500 font-mono">{lookupResult.phonetic}</p>
              </div>
              <div className="bg-emerald-50 px-4 py-2 rounded-2xl text-emerald-700 font-bold">
                {lookupResult.meaning}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-lg font-black text-emerald-900 flex items-center gap-2">
                  <Languages className="text-blue-500" size={20} /> VÍ DỤ MINH HỌA
                </h4>
                <div className="space-y-4">
                  {lookupResult.examples?.map((ex, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-emerald-50 border-l-4 border-emerald-500">
                      <p className="text-emerald-900 font-bold">"{ex.en}"</p>
                      <p className="text-emerald-600 text-sm italic">→ {ex.vi}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-black text-emerald-400 uppercase tracking-widest">Từ đồng nghĩa</h4>
                  <div className="flex flex-wrap gap-2">
                    {lookupResult.synonyms?.map(s => (
                      <span key={s} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold border border-blue-100">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-black text-emerald-400 uppercase tracking-widest">Từ trái nghĩa</h4>
                  <div className="flex flex-wrap gap-2">
                    {lookupResult.antonyms?.map(a => (
                      <span key={a} className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-bold border border-red-100">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-yellow-50 rounded-3xl border-2 border-yellow-100 relative overflow-hidden">
                  <div className="relative z-10">
                    <h4 className="text-yellow-800 font-black flex items-center gap-2 mb-2">
                      <Sparkles size={18} /> Frog Tip:
                    </h4>
                    <p className="text-yellow-700 text-sm leading-relaxed italic">
                      {lookupResult.frogTip}
                    </p>
                  </div>
                  <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12">
                    <FrogMascot className="w-24 h-24" level={user?.level} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // Entertainment Hub State (Đầm Lầy Vui Nhộn)
  const [entertainmentSubView, setEntertainmentSubView] = useState<'menu' | 'word-scramble' | 'image-match' | 'pronunciation' | 'translator'>('menu');
  const [isGeneratingGame, setIsGeneratingGame] = useState(false);
  const [gameFeedback, setGameFeedback] = useState('');
  
  // Word Scramble State
  const [originalWord, setOriginalWord] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const [scrambleInput, setScrambleInput] = useState('');
  
  // Image Match State
  const [imageMatchDescription, setImageMatchDescription] = useState('');
  const [imageMatchAnswer, setImageMatchAnswer] = useState('');
  const [imageMatchInput, setImageMatchInput] = useState('');
  
  // Pronunciation State
  const [pronunciationSentence, setPronunciationSentence] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [pronunciationResult, setPronunciationResult] = useState<{ score: number; feedback: string; transcript: string } | null>(null);

  const [translatorInputText, setTranslatorInputText] = useState('');

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const startWordScramble = () => {
    if (!user || !user.notebook || user.notebook.length === 0) {
      setGameFeedback("Sổ tay của bạn đang trống! Hãy học thêm từ vựng để chơi nhé.");
      return;
    }
    const randomNote = user.notebook[Math.floor(Math.random() * user.notebook.length)];
    const word = randomNote.word;
    setOriginalWord(word);
    setScrambledWord(word.split('').sort(() => Math.random() - 0.5).join(''));
    setScrambleInput('');
    setGameFeedback('');
    setEntertainmentSubView('word-scramble');
  };

  const startImageMatch = async () => {
    if (!user) return;
    setIsGeneratingGame(true);
    setEntertainmentSubView('image-match');
    setImageMatchInput('');
    setGameFeedback('');

    try {
      const prompt = `Bạn là Quản trò Đầm Lầy Efrog. Hãy tạo một thử thách "Đuổi Hình Bắt Ếch".
Hãy chọn một từ vựng tiếng Anh trình độ ${user.level} và mô tả một hình ảnh hoặc ngữ cảnh sinh động để người dùng đoán từ đó.
Cấu trúc JSON:
{
  "description": "string (mô tả bằng tiếng Việt)",
  "answer": "string (từ vựng tiếng Anh)",
  "phonetic": "string",
  "meaning": "string (nghĩa tiếng Việt)",
  "example": "string (ví dụ tiếng Anh)",
  "synonyms": ["string"],
  "antonyms": ["string"]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              description: { type: Type.STRING },
              answer: { type: Type.STRING },
              phonetic: { type: Type.STRING },
              meaning: { type: Type.STRING },
              example: { type: Type.STRING },
              synonyms: { type: Type.ARRAY, items: { type: Type.STRING } },
              antonyms: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          }
        }
      });

      const data = JSON.parse(response.text || '{}');
      setImageMatchDescription(data.description);
      setImageMatchAnswer(data.answer);
      // Store full word info for saving later
      (window as any).currentImageMatchWord = data;
    } catch (error) {
      console.error("Error starting image match:", error);
    } finally {
      setIsGeneratingGame(false);
    }
  };

  const startPronunciation = async () => {
    if (!user) return;
    setIsGeneratingGame(true);
    setEntertainmentSubView('pronunciation');
    setPronunciationResult(null);
    setGameFeedback('');

    try {
      const prompt = `Bạn là Huấn luyện viên ngôn ngữ Efrog. Hãy đưa ra một câu tiếng Anh hay (ưu tiên cấu trúc khó như đảo ngữ, câu điều kiện) để người dùng luyện phát âm (Shadowing) cho trình độ ${user.level}.
Cấu trúc JSON:
{
  "sentence": "string",
  "mainWord": {
    "word": "string (từ quan trọng nhất trong câu)",
    "phonetic": "string",
    "meaning": "string",
    "example": "string",
    "synonyms": ["string"],
    "antonyms": ["string"]
  }
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              sentence: { type: Type.STRING },
              mainWord: {
                type: Type.OBJECT,
                properties: {
                  word: { type: Type.STRING },
                  phonetic: { type: Type.STRING },
                  meaning: { type: Type.STRING },
                  example: { type: Type.STRING },
                  synonyms: { type: Type.ARRAY, items: { type: Type.STRING } },
                  antonyms: { type: Type.ARRAY, items: { type: Type.STRING } }
                }
              }
            }
          }
        }
      });

      const data = JSON.parse(response.text || '{}');
      setPronunciationSentence(data.sentence);
      (window as any).currentPronunciationWord = data.mainWord;
    } catch (error) {
      console.error("Error starting pronunciation:", error);
    } finally {
      setIsGeneratingGame(false);
    }
  };

  const handleScrambleSubmit = () => {
    if (scrambleInput.toLowerCase() === originalWord.toLowerCase()) {
      setGameFeedback("Chính xác! Bạn đã nhận được 10 Nòng nọc! 🐸✨");
      const updatedUser = { ...user!, tadpoles: user!.tadpoles + 10 };
      setUser(updatedUser);
      localStorage.setItem('efrog_user', JSON.stringify(updatedUser));
    } else {
      setGameFeedback("Chưa đúng rồi, hãy thử lại nhé!");
    }
  };

  const handleImageMatchSubmit = () => {
    if (imageMatchInput.toLowerCase() === imageMatchAnswer.toLowerCase()) {
      setGameFeedback("Tuyệt vời! Bạn đã đoán đúng và nhận 15 Nòng nọc! 🐸✨");
      
      const wordData = (window as any).currentImageMatchWord;
      let updatedNotebook = [...(user?.notebook || [])];
      
      if (wordData && !updatedNotebook.some(n => n.word.toLowerCase() === wordData.answer.toLowerCase())) {
        const newNote: StickyNote = {
          id: Math.random().toString(36).substr(2, 9),
          word: wordData.answer,
          phonetic: wordData.phonetic,
          meaning: wordData.meaning,
          example: wordData.example,
          synonyms: wordData.synonyms,
          antonyms: wordData.antonyms,
          savedAt: new Date().toISOString()
        };
        updatedNotebook = [newNote, ...updatedNotebook];
      }

      const updatedUser = { 
        ...user!, 
        tadpoles: user!.tadpoles + 15,
        notebook: updatedNotebook
      };
      setUser(updatedUser);
      localStorage.setItem('efrog_user', JSON.stringify(updatedUser));
    } else {
      setGameFeedback(`Gần đúng rồi! Đáp án là: ${imageMatchAnswer}`);
    }
  };

  const handlePronunciationListen = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setGameFeedback("Trình duyệt của bạn không hỗ trợ nhận diện giọng nói.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);
    recognition.start();

    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;
      setIsListening(false);
      
      // Use Gemini to analyze pronunciation
      setIsGeneratingGame(true);
      try {
        const prompt = `Bạn là Huấn luyện viên ngôn ngữ Efrog. Người dùng vừa đọc câu: "${pronunciationSentence}".
Kết quả nhận diện giọng nói là: "${transcript}".
Hãy chấm điểm phát âm trên thang điểm 100 và đưa ra nhận xét ngắn gọn, vui vẻ.
Nếu điểm >= 90: Perfect (30 Nòng nọc).
Nếu điểm >= 70: Good (15 Nòng nọc).
Nếu điểm < 70: Needs Practice.
Cấu trúc JSON:
{
  "score": number,
  "feedback": "string",
  "status": "Perfect" | "Good" | "Needs Practice"
}`;

        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                score: { type: Type.NUMBER },
                feedback: { type: Type.STRING },
                status: { type: Type.STRING }
              }
            }
          }
        });

        const data = JSON.parse(response.text || '{}');
        setPronunciationResult({ score: data.score, feedback: data.feedback, transcript });
        
        let tadpolesBonus = 0;
        if (data.status === 'Perfect') tadpolesBonus = 30;
        else if (data.status === 'Good') tadpolesBonus = 15;

        const mainWordData = (window as any).currentPronunciationWord;
        let updatedNotebook = [...(user?.notebook || [])];

        if (mainWordData) {
          const existingNoteIdx = updatedNotebook.findIndex(n => n.word.toLowerCase() === mainWordData.word.toLowerCase());
          
          if (existingNoteIdx > -1) {
            if (data.status === 'Needs Practice') {
              updatedNotebook[existingNoteIdx] = { ...updatedNotebook[existingNoteIdx], needsPractice: true };
            }
          } else {
            const newNote: StickyNote = {
              id: Math.random().toString(36).substr(2, 9),
              word: mainWordData.word,
              phonetic: mainWordData.phonetic,
              meaning: mainWordData.meaning,
              example: mainWordData.example,
              synonyms: mainWordData.synonyms,
              antonyms: mainWordData.antonyms,
              savedAt: new Date().toISOString(),
              needsPractice: data.status === 'Needs Practice'
            };
            updatedNotebook = [newNote, ...updatedNotebook];
          }
        }

        const updatedUser = { 
          ...user!, 
          tadpoles: user!.tadpoles + tadpolesBonus,
          notebook: updatedNotebook
        };
        setUser(updatedUser);
        localStorage.setItem('efrog_user', JSON.stringify(updatedUser));

      } catch (error) {
        console.error("Error analyzing pronunciation:", error);
      } finally {
        setIsGeneratingGame(false);
      }
    };

    recognition.onerror = (event: any) => {
      setIsListening(false);
      setGameFeedback("Có lỗi khi nhận diện giọng nói: " + event.error);
    };
  };

  // Smart Translator State
  const [translatorInput, setTranslatorInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [translationResult, setTranslationResult] = useState<TranslationResult | null>(null);
  const [savedWordsCount, setSavedWordsCount] = useState(0);

  const analyzeText = async (text: string) => {
    if (!text || !user) return;
    setIsAnalyzing(true);
    setTranslationResult(null);
    setSavedWordsCount(0);
    setCurrentView('smart-translator');
    setTranslatorInput(text);

    try {
      const prompt = `Bạn là Trợ lý Ngôn ngữ của Efrog. Hãy phân tích đoạn văn bản sau cho người dùng trình độ ${user.level}:
"${text}"

Nhiệm vụ:
1. Dịch sát nghĩa (Literal): Giúp hiểu cấu trúc câu.
2. Dịch thoát ý (Idiomatic): Giúp hiểu văn phong tự nhiên.
3. Phân tích ngữ pháp: Chỉ ra các cấu trúc chính.
4. Trích xuất 3-5 từ vựng "đắt giá" (C1/C2 nếu là Tiến sĩ) và tạo Sticky Notes.

Cấu trúc JSON yêu cầu:
{
  "literal": "string",
  "idiomatic": "string",
  "grammarAnalysis": "string",
  "stickyNotes": [
    {
      "word": "string",
      "phonetic": "string",
      "meaning": "string",
      "example": "string",
      "synonyms": ["string"],
      "antonyms": ["string"]
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              literal: { type: Type.STRING },
              idiomatic: { type: Type.STRING },
              grammarAnalysis: { type: Type.STRING },
              stickyNotes: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    word: { type: Type.STRING },
                    phonetic: { type: Type.STRING },
                    meaning: { type: Type.STRING },
                    example: { type: Type.STRING },
                    synonyms: { type: Type.ARRAY, items: { type: Type.STRING } },
                    antonyms: { type: Type.ARRAY, items: { type: Type.STRING } }
                  }
                }
              }
            }
          }
        }
      });

      const data = JSON.parse(response.text || '{}');
      // Add IDs and timestamps to sticky notes
      const processedNotes = (data.stickyNotes || []).map((note: any) => ({
        ...note,
        id: Math.random().toString(36).substr(2, 9),
        savedAt: new Date().toISOString()
      }));
      
      setTranslationResult({
        ...data,
        stickyNotes: processedNotes
      });
    } catch (error) {
      console.error("Error analyzing text:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const saveToNotebook = (note: StickyNote) => {
    if (!user) return;
    
    // Check if already saved
    if (user.notebook?.some(n => n.word.toLowerCase() === note.word.toLowerCase())) {
      return;
    }

    const updatedUser = {
      ...user,
      tadpoles: user.tadpoles + 5,
      notebook: [...(user.notebook || []), note]
    };
    setUser(updatedUser);
    localStorage.setItem('efrog_user', JSON.stringify(updatedUser));
    setSavedWordsCount(prev => prev + 1);
  };

  const renderEntertainmentHub = () => (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => {
            if (entertainmentSubView === 'menu') setCurrentView('home');
            else setEntertainmentSubView('menu');
          }} className="p-2 hover:bg-emerald-50 rounded-full">
            <ArrowLeft className="w-6 h-6 text-emerald-700" />
          </button>
          <h2 className="text-2xl font-bold text-emerald-900">Đầm Lầy Vui Nhộn</h2>
        </div>
        <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-2xl border-2 border-yellow-200">
          <Coins className="text-yellow-600" size={20} />
          <span className="font-bold text-yellow-700">{user?.tadpoles || 0} Nòng nọc</span>
        </div>
      </div>

      {entertainmentSubView === 'menu' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            onClick={startWordScramble}
            className="bg-white p-8 rounded-[40px] border-4 border-emerald-100 shadow-xl text-center space-y-4 group"
          >
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-emerald-200 transition-colors">
              <Dices className="text-emerald-600 w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-emerald-900">Ếch Nhảy Chữ</h3>
              <p className="text-sm text-emerald-600">Sắp xếp lại các chữ cái từ Sổ tay của bạn!</p>
            </div>
            <div className="bg-emerald-50 py-2 rounded-xl text-emerald-700 font-bold text-sm">Thưởng: 10 Nòng nọc</div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            onClick={startImageMatch}
            className="bg-white p-8 rounded-[40px] border-4 border-blue-100 shadow-xl text-center space-y-4 group"
          >
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-blue-200 transition-colors">
              <ImageIcon className="text-blue-600 w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-blue-900">Đuổi Hình Bắt Ếch</h3>
              <p className="text-sm text-blue-600">Đoán từ vựng qua mô tả sinh động!</p>
            </div>
            <div className="bg-blue-50 py-2 rounded-xl text-blue-700 font-bold text-sm">Thưởng: 15 Nòng nọc</div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            onClick={startPronunciation}
            className="bg-white p-8 rounded-[40px] border-4 border-purple-100 shadow-xl text-center space-y-4 group"
          >
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-purple-200 transition-colors">
              <Mic className="text-purple-600 w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-purple-900">Tiếng Ếch Ộp</h3>
              <p className="text-sm text-purple-600">Luyện phát âm chuẩn như ca sĩ đầm lầy!</p>
            </div>
            <div className="bg-purple-50 py-2 rounded-xl text-purple-700 font-bold text-sm">Thưởng: Lên tới 30 Nòng nọc</div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            onClick={() => generateMatchingQuiz()}
            className="bg-white p-8 rounded-[40px] border-4 border-yellow-100 shadow-xl text-center space-y-4 group"
          >
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-yellow-200 transition-colors">
              <Gamepad2 className="text-yellow-600 w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-yellow-900">Thử Thách Nối Từ</h3>
              <p className="text-sm text-yellow-600">Nối từ vựng với định nghĩa song ngữ!</p>
            </div>
            <div className="bg-yellow-50 py-2 rounded-xl text-yellow-700 font-bold text-sm">Thưởng: Lên tới 50 Nòng nọc</div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            onClick={() => setEntertainmentSubView('translator')}
            className="bg-white p-8 rounded-[40px] border-4 border-orange-100 shadow-xl text-center space-y-4 group"
          >
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-orange-200 transition-colors">
              <Languages className="text-orange-600 w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-orange-900">Dịch Thông Thái</h3>
              <p className="text-sm text-orange-600">Phân tích ngữ pháp & lưu từ vựng đắt giá!</p>
            </div>
            <div className="bg-orange-50 py-2 rounded-xl text-orange-700 font-bold text-sm">Thưởng: 5 Nòng nọc/từ</div>
          </motion.button>
        </div>
      )}

      {entertainmentSubView === 'word-scramble' && (
        <section className="bg-white p-12 rounded-[40px] border-4 border-emerald-100 shadow-2xl text-center space-y-8">
          <div className="space-y-2">
            <h3 className="text-3xl font-black text-emerald-900 uppercase tracking-tighter">Ếch Nhảy Chữ</h3>
            <p className="text-emerald-600 font-medium">Hãy sắp xếp lại các chữ cái sau thành từ đúng:</p>
          </div>

          <div className="flex justify-center gap-2 flex-wrap">
            {scrambledWord.split('').map((char, i) => (
              <motion.div
                key={i}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center text-2xl font-black shadow-lg"
              >
                {char.toUpperCase()}
              </motion.div>
            ))}
          </div>

          <div className="max-w-md mx-auto space-y-4">
            <input
              type="text"
              value={scrambleInput}
              onChange={(e) => setScrambleInput(e.target.value)}
              placeholder="Nhập từ của bạn..."
              className="w-full bg-emerald-50 border-2 border-emerald-200 rounded-2xl py-4 px-6 text-center text-2xl font-bold text-emerald-900 outline-none focus:border-emerald-500 transition-all"
            />
            <div className="flex gap-4">
              <button
                onClick={startWordScramble}
                className="flex-1 bg-emerald-100 text-emerald-700 py-4 rounded-2xl font-bold hover:bg-emerald-200 transition-all"
              >
                ĐỔI TỪ KHÁC
              </button>
              <button
                onClick={handleScrambleSubmit}
                className="flex-[2] bg-emerald-600 text-white py-4 rounded-2xl font-black text-xl hover:bg-emerald-700 transition-all shadow-lg"
              >
                KIỂM TRA
              </button>
            </div>
          </div>

          {gameFeedback && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={cn(
                "text-lg font-bold p-4 rounded-2xl",
                gameFeedback.includes('Chính xác') ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
              )}
            >
              {gameFeedback}
            </motion.p>
          )}
        </section>
      )}

      {entertainmentSubView === 'image-match' && (
        <section className="bg-white p-12 rounded-[40px] border-4 border-blue-100 shadow-2xl text-center space-y-8">
          <div className="space-y-2">
            <h3 className="text-3xl font-black text-blue-900 uppercase tracking-tighter">Đuổi Hình Bắt Ếch</h3>
            <p className="text-blue-600 font-medium">Đoán từ vựng dựa trên mô tả sau:</p>
          </div>

          {isGeneratingGame ? (
            <div className="py-12 flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-blue-700 font-bold animate-pulse">Ếch Quản Trò đang vẽ hình...</p>
            </div>
          ) : (
            <div className="bg-blue-50 p-8 rounded-3xl border-2 border-blue-100 italic text-blue-900 text-xl leading-relaxed">
              "{imageMatchDescription}"
            </div>
          )}

          <div className="max-w-md mx-auto space-y-4">
            <input
              type="text"
              value={imageMatchInput}
              onChange={(e) => setImageMatchInput(e.target.value)}
              placeholder="Từ vựng là gì nhỉ?"
              className="w-full bg-blue-50 border-2 border-blue-200 rounded-2xl py-4 px-6 text-center text-2xl font-bold text-blue-900 outline-none focus:border-blue-500 transition-all"
            />
            <div className="flex gap-4">
              <button
                onClick={startImageMatch}
                className="flex-1 bg-blue-100 text-blue-700 py-4 rounded-2xl font-bold hover:bg-blue-200 transition-all"
              >
                CÂU KHÁC
              </button>
              <button
                onClick={handleImageMatchSubmit}
                className="flex-[2] bg-blue-600 text-white py-4 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all shadow-lg"
              >
                ĐOÁN NGAY
              </button>
            </div>
          </div>

          {gameFeedback && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={cn(
                "text-lg font-bold p-4 rounded-2xl",
                gameFeedback.includes('Tuyệt vời') ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
              )}
            >
              {gameFeedback}
            </motion.p>
          )}
        </section>
      )}

      {entertainmentSubView === 'pronunciation' && (
        <section className="bg-white p-12 rounded-[40px] border-4 border-purple-100 shadow-2xl text-center space-y-8">
          <div className="space-y-2">
            <h3 className="text-3xl font-black text-purple-900 uppercase tracking-tighter">Tiếng Ếch Ộp</h3>
            <p className="text-purple-600 font-medium">Hãy luyện giọng để trở thành ca sĩ của Đầm Lầy nào!</p>
          </div>

          {isGeneratingGame ? (
            <div className="py-12 flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-purple-700 font-bold animate-pulse">Ếch Huấn Luyện Viên đang chọn bài hát...</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-purple-50 p-8 rounded-3xl border-2 border-purple-100 space-y-4">
                <p className="text-purple-900 text-2xl font-bold leading-relaxed">
                  "{pronunciationSentence}"
                </p>
                <button 
                  onClick={() => speak(pronunciationSentence)}
                  className="bg-purple-200 text-purple-700 p-3 rounded-full hover:bg-purple-300 transition-all"
                >
                  <Volume2 size={24} />
                </button>
              </div>

              <div className="flex flex-col items-center gap-6">
                <button
                  onClick={handlePronunciationListen}
                  disabled={isListening || isGeneratingGame}
                  className={cn(
                    "w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-2xl relative",
                    isListening ? "bg-red-500 animate-pulse scale-110" : "bg-purple-600 hover:bg-purple-700"
                  )}
                >
                  {isListening ? <X className="text-white w-10 h-10" /> : <Mic className="text-white w-10 h-10" />}
                  {isListening && (
                    <div className="absolute inset-0 border-4 border-white rounded-full animate-ping" />
                  )}
                </button>
                <p className="text-purple-700 font-black uppercase tracking-widest">
                  {isListening ? "Đang lắng nghe..." : "Nhấn để bắt đầu đọc"}
                </p>
              </div>
            </div>
          )}

          {pronunciationResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-3xl border-2 border-purple-100 shadow-lg space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-sm text-purple-500 font-bold uppercase">Kết quả của bạn:</p>
                  <p className="text-lg text-purple-900 italic">"{pronunciationResult.transcript}"</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-black text-purple-600">{pronunciationResult.score}</p>
                  <p className="text-xs text-purple-400 font-bold">ĐIỂM SỐ</p>
                </div>
              </div>
              <div className="p-4 bg-purple-50 rounded-2xl text-purple-800 font-medium italic">
                {pronunciationResult.feedback}
              </div>
              <button 
                onClick={startPronunciation}
                className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition-all"
              >
                THỬ CÂU KHÁC
              </button>
            </motion.div>
          )}

          {gameFeedback && (
            <p className="text-red-500 font-bold">{gameFeedback}</p>
          )}
        </section>
      )}

      {entertainmentSubView === 'translator' && (
        <section className="bg-white p-12 rounded-[40px] border-4 border-orange-100 shadow-2xl space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-3xl font-black text-orange-900 uppercase tracking-tighter">Dịch Thông Thái</h3>
            <p className="text-orange-600 font-medium">Nhập văn bản tiếng Anh để Ếch Thông Thái phân tích giúp bạn!</p>
          </div>

          <div className="space-y-4">
            <textarea
              value={translatorInputText}
              onChange={(e) => setTranslatorInputText(e.target.value)}
              placeholder="Dán đoạn văn bản tiếng Anh vào đây..."
              className="w-full h-40 bg-orange-50 border-2 border-orange-200 rounded-3xl p-6 text-lg font-medium text-orange-900 outline-none focus:border-orange-500 transition-all resize-none"
            />
            <button
              onClick={() => analyzeText(translatorInputText)}
              disabled={!translatorInputText || isAnalyzing}
              className="w-full bg-orange-600 text-white py-4 rounded-2xl font-black text-xl hover:bg-orange-700 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isAnalyzing ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles size={24} /> PHÂN TÍCH NGAY
                </>
              )}
            </button>
          </div>
        </section>
      )}
    </div>
  );

  // Placement Test State
  const [placementStep, setPlacementStep] = useState(1);
  const [placementFeedback, setPlacementFeedback] = useState<string | null>(null);
  const [isPlacementFinished, setIsPlacementFinished] = useState(false);
  const [finalPlacementLevel, setFinalPlacementLevel] = useState<Level | null>(null);
  const [currentPlacementQuestion, setCurrentPlacementQuestion] = useState<PlacementQuestion | null>(null);
  const [isGeneratingPlacement, setIsGeneratingPlacement] = useState(false);

  // Matching Quiz State
  const [matchingQuizQuestions, setMatchingQuizQuestions] = useState<MatchingQuestion[]>([]);
  const [matchingQuizStep, setMatchingQuizStep] = useState(0);
  const [matchingQuizAnswers, setMatchingQuizAnswers] = useState<number[]>([]);
  const [matchingQuizFeedback, setMatchingQuizFeedback] = useState<string | null>(null);
  const [isMatchingQuizFinished, setIsMatchingQuizFinished] = useState(false);
  const [isGeneratingMatchingQuiz, setIsGeneratingMatchingQuiz] = useState(false);

  // Frog Tutor State
  const [tutorMessages, setTutorMessages] = useState<TutorMessage[]>([]);
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [isTutorThinking, setIsTutorThinking] = useState(false);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());

  useEffect(() => {
    const viewsWithTutor = ['placement-test', 'warmup', 'quiz', 'matching-quiz'];
    if (!viewsWithTutor.includes(currentView)) {
      setIsTutorOpen(false);
      setTutorMessages([]);
      return;
    }

    const interval = setInterval(() => {
      const inactiveTime = Date.now() - lastInteractionTime;
      if (inactiveTime > 20000 && !isTutorOpen && !isTutorThinking && tutorMessages.length === 0) {
        setIsTutorOpen(true);
        handleTutorProactive();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentView, lastInteractionTime, isTutorOpen, isTutorThinking, tutorMessages.length]);

  const getTutorContext = () => {
    if (currentView === 'placement-test') return `Câu hỏi kiểm tra đầu vào số ${placementStep}: ${currentPlacementQuestion?.text}`;
    if (currentView === 'warmup') return `Bài khởi động trình độ ${user?.level}.`;
    if (currentView === 'quiz') return `Bài luyện đề: ${selectedQuiz?.title}.`;
    if (currentView === 'matching-quiz') return `Thử thách nối từ: ${matchingQuizQuestions[matchingQuizStep]?.word}`;
    return "";
  };

  const handleTutorProactive = async () => {
    setIsTutorThinking(true);
    try {
      const context = getTutorContext();
      const prompt = `Bạn là Ếch Gia Sư, một trợ lý AI thông minh của app Efrog. 
Người dùng đang làm bài tập ở phần ${currentView}. 
Ngữ cảnh hiện tại: ${context}
Người dùng đã dừng lại ở câu hỏi này hơn 20 giây. Hãy "nhảy" ra chào hỏi một cách hóm hỉnh và đưa ra một gợi ý nhẹ nhàng (HINT) để khích lệ họ tiếp tục, tuyệt đối không cho đáp án.
Tông giọng: Kiên nhẫn, khích lệ, hóm hỉnh phong cách loài ếch.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });
      const text = response.text || "Quác! Có vẻ câu này hơi 'khoai' một chút nhỉ? Đừng lo, ta ở đây để giúp bạn nhảy qua nó! Bạn cần ta gợi ý gì không?";
      setTutorMessages([{ role: 'tutor', content: text }]);
    } catch (error) {
      console.error("Tutor error:", error);
    } finally {
      setIsTutorThinking(false);
    }
  };

  const askFrogTutor = async (userMessage: string) => {
    const newMessages: TutorMessage[] = [...tutorMessages, { role: 'user', content: userMessage }];
    setTutorMessages(newMessages);
    setIsTutorThinking(true);
    setIsTutorOpen(true);

    try {
      const context = getTutorContext();
      const prompt = `Bạn là Ếch Gia Sư, trợ lý AI của Efrog. 
Nhiệm vụ: Hỗ trợ người dùng làm bài tập mà không cho trực tiếp đáp án.
Ngữ cảnh: ${context}

Quy tắc:
1. Không giải hộ: Nếu hỏi đáp án, hãy gợi ý cấu trúc ngữ pháp/từ loại.
2. Giải thích ngữ cảnh: Nếu người dùng sai, hãy phân tích tại sao.
3. Gợi mở (Hint): Đưa ra ví dụ tương tự đơn giản hơn.
4. Tích hợp Sổ tay: Nếu hỏi về từ vựng, giải nghĩa và hỏi xem họ có muốn lưu vào Sổ tay (+5 Nòng nọc) không.
5. Tông giọng: Kiên nhẫn, khích lệ, hóm hỉnh phong cách loài ếch.

Lịch sử trò chuyện:
${newMessages.map(m => `${m.role === 'user' ? 'Người dùng' : 'Ếch Gia Sư'}: ${m.content}`).join('\n')}

Câu hỏi mới: ${userMessage}`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });
      const text = response.text || "Quác! Ta đang suy nghĩ một chút, bạn đợi ta nhé!";
      setTutorMessages([...newMessages, { role: 'tutor', content: text }]);
    } catch (error) {
      console.error("Tutor error:", error);
      setTutorMessages([...newMessages, { role: 'tutor', content: "Quác! Đầm lầy đang hơi đục, ta chưa nghe rõ bạn nói gì. Bạn nói lại được không?" }]);
    } finally {
      setIsTutorThinking(false);
    }
  };

  // Onboarding state
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [tempEmail, setTempEmail] = useState('');
  const [tempNickname, setTempNickname] = useState('');
  const [tempLevel, setTempLevel] = useState<Level>('Tập sự');

  useEffect(() => {
    const savedUser = localStorage.getItem('efrog_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      // Ensure notebook exists for older users
      if (!parsedUser.notebook) {
        parsedUser.notebook = [];
      }
      setUser(parsedUser);
      setCurrentView('home');

      // Trigger Day 5 Scenario if streak is 5 and not seen yet
      if (parsedUser.streak === 5 && !parsedUser.hasSeenDay5Scenario) {
        setShowDay5Scenario(true);
      }
    }
  }, []);

  const generateMatchingQuiz = async (topic?: string) => {
    setIsGeneratingMatchingQuiz(true);
    setCurrentView('matching-quiz');
    setMatchingQuizStep(0);
    setMatchingQuizAnswers([]);
    setMatchingQuizFeedback(null);
    setIsMatchingQuizFinished(false);

    let vocabSource = "";
    if (topic) {
      vocabSource = `chủ đề "${topic}"`;
    } else if (user?.notebook && user.notebook.length >= 4) {
      vocabSource = `danh sách từ vựng trong Sổ tay của người dùng: ${user.notebook.map(n => n.word).join(', ')}`;
    } else {
      vocabSource = "chủ đề 'Công nghệ và Môi trường'";
    }

    try {
      const prompt = `Bạn là chuyên gia biên soạn học liệu của Efrog. Hãy tạo một bộ bài tập trắc nghiệm nối từ vựng (Matching Quiz) gồm 5 câu hỏi dựa trên ${vocabSource}.

Cấu trúc mỗi câu hỏi:
1. Một từ vựng tiếng Anh (kèm phiên âm IPA).
2. 4 phương án, mỗi phương án là một bộ định nghĩa theo cấu trúc: [Định nghĩa tiếng Anh] - [Dịch tiếng Việt].
3. Định nghĩa tiếng Việt phải sát nghĩa và tự nhiên.
4. Các phương án nhiễu (distractors) phải là định nghĩa của các từ vựng khác cùng chủ đề để tăng độ khó.

Cấu trúc JSON:
{
  "questions": [
    {
      "word": "string",
      "phonetic": "string",
      "options": [
        { "definition": "string", "translation": "string" },
        { "definition": "string", "translation": "string" },
        { "definition": "string", "translation": "string" },
        { "definition": "string", "translation": "string" }
      ],
      "correctAnswer": number (0-3)
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    word: { type: Type.STRING },
                    phonetic: { type: Type.STRING },
                    options: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          definition: { type: Type.STRING },
                          translation: { type: Type.STRING }
                        },
                        required: ["definition", "translation"]
                      }
                    },
                    correctAnswer: { type: Type.NUMBER }
                  },
                  required: ["word", "phonetic", "options", "correctAnswer"]
                }
              }
            },
            required: ["questions"]
          }
        }
      });

      const data = JSON.parse(response.text || '{}');
      setMatchingQuizQuestions(data.questions);
    } catch (error) {
      console.error("Error generating matching quiz:", error);
      setMatchingQuizQuestions([
        {
          word: "Sustainable",
          phonetic: "/səˈsteɪ.nə.bəl/",
          options: [
            { definition: "Able to be maintained at a certain rate or level", translation: "Có thể duy trì ở một mức độ nhất định" },
            { definition: "Causing little or no damage to the environment", translation: "Gây ít hoặc không gây hại cho môi trường" },
            { definition: "Involving the use of natural products and energy", translation: "Liên quan đến việc sử dụng các sản phẩm tự nhiên và năng lượng" },
            { definition: "Able to continue over a period of time", translation: "Có khả năng tiếp tục trong một khoảng thời gian" }
          ],
          correctAnswer: 1
        }
      ]);
    } finally {
      setIsGeneratingMatchingQuiz(false);
    }
  };

  const handleMatchingQuizAnswer = (answerIndex: number) => {
    setLastInteractionTime(Date.now());
    const currentQ = matchingQuizQuestions[matchingQuizStep];
    const isCorrect = answerIndex === currentQ.correctAnswer;
    
    const newAnswers = [...matchingQuizAnswers];
    newAnswers[matchingQuizStep] = answerIndex;
    setMatchingQuizAnswers(newAnswers);

    if (isCorrect) {
      setMatchingQuizFeedback("Chính xác! Bạn lướt trên mặt nước thật điêu luyện. Quác!");
    } else {
      setMatchingQuizFeedback(`Chưa đúng rồi! Đáp án đúng là: ${currentQ.options[currentQ.correctAnswer].definition} - ${currentQ.options[currentQ.correctAnswer].translation}`);
    }

    if (matchingQuizStep === matchingQuizQuestions.length - 1) {
      setIsMatchingQuizFinished(true);
      
      // Calculate final score and reward
      const correctCount = newAnswers.filter((ans, idx) => ans === matchingQuizQuestions[idx].correctAnswer).length;
      let reward = 0;
      if (correctCount === matchingQuizQuestions.length) {
        reward = 50;
      } else if (correctCount > 0) {
        reward = 20;
      }

      if (user && reward > 0) {
        const updatedUser = { ...user, tadpoles: user.tadpoles + reward };
        setUser(updatedUser);
        localStorage.setItem('efrog_user', JSON.stringify(updatedUser));
      }
    }
  };

  const renderMatchingQuiz = () => {
    if (isGeneratingMatchingQuiz) {
      return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-6">
          <FrogMascot className="w-48 h-48 animate-bounce" mood="thinking" level={user?.level} />
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-emerald-800">Ếch Chuyên Gia đang soạn bài...</h2>
            <p className="text-emerald-600 italic">"Đang chuẩn bị bộ trắc nghiệm nối từ cho bạn. Đợi ta một chút nhé! Quác!"</p>
          </div>
        </div>
      );
    }

    if (!matchingQuizQuestions.length) return null;

    const currentQ = matchingQuizQuestions[matchingQuizStep];
    const correctCount = matchingQuizAnswers.filter((ans, idx) => ans === matchingQuizQuestions[idx].correctAnswer).length;

    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-[40px] shadow-2xl border-4 border-emerald-100 max-w-3xl w-full space-y-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Gamepad2 size={120} className="text-emerald-500" />
          </div>

          <div className="text-center space-y-4">
            <div className="flex justify-between items-center">
              <button onClick={() => setCurrentView('entertainment-hub')} className="p-2 hover:bg-emerald-50 rounded-full">
                <ArrowLeft className="w-6 h-6 text-emerald-700" />
              </button>
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-emerald-900">THỬ THÁCH NỐI TỪ</h2>
                <p className="text-emerald-600 font-bold uppercase tracking-widest text-xs">Câu hỏi {matchingQuizStep + 1} / {matchingQuizQuestions.length}</p>
              </div>
              <div className="w-10" />
            </div>
            
            <div className="w-full h-2 bg-emerald-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-emerald-500"
                initial={{ width: 0 }}
                animate={{ width: `${((matchingQuizStep + 1) / matchingQuizQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {!matchingQuizFeedback ? (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h3 className="text-4xl font-black text-emerald-900">{currentQ.word}</h3>
                <p className="text-emerald-600 font-mono text-lg">{currentQ.phonetic}</p>
                <button onClick={() => speak(currentQ.word)} className="p-2 bg-emerald-50 text-emerald-600 rounded-full hover:bg-emerald-100 transition-all">
                  <Volume2 size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {currentQ.options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleMatchingQuizAnswer(idx)}
                    className="p-5 bg-white border-2 border-emerald-100 rounded-2xl text-left hover:border-emerald-500 hover:bg-emerald-50 transition-all group"
                  >
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 font-black shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-emerald-900 leading-tight">{option.definition}</p>
                        <p className="text-sm text-emerald-600 italic">{option.translation}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8 text-center"
            >
              <div className={cn(
                "p-8 rounded-3xl border-2 space-y-4",
                matchingQuizFeedback.includes('Chưa đúng') ? "bg-red-50 border-red-100 text-red-900" : "bg-emerald-50 border-emerald-100 text-emerald-900"
              )}>
                <p className="text-xl font-bold leading-relaxed whitespace-pre-wrap">
                  {matchingQuizFeedback}
                </p>
              </div>

              {isMatchingQuizFinished ? (
                <div className="space-y-6">
                  <div className="bg-yellow-50 p-8 rounded-[40px] border-4 border-yellow-200 space-y-4">
                    <FrogMascot className="w-32 h-32 mx-auto" mood={correctCount === matchingQuizQuestions.length ? 'cheering' : 'happy'} level={user?.level} />
                    <h3 className="text-2xl font-black text-yellow-900">KẾT QUẢ THỬ THÁCH</h3>
                    <div className="flex justify-center gap-8">
                      <div className="text-center">
                        <p className="text-3xl font-black text-yellow-900">{correctCount}/{matchingQuizQuestions.length}</p>
                        <p className="text-xs font-bold text-yellow-600 uppercase tracking-widest">Chính xác</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-black text-emerald-600">+{correctCount === matchingQuizQuestions.length ? 50 : correctCount > 0 ? 20 : 0}</p>
                        <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Nòng nọc</p>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setCurrentView('entertainment-hub')}
                    className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-emerald-700 shadow-xl transition-all"
                  >
                    HOÀN THÀNH
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => {
                    setMatchingQuizStep(prev => prev + 1);
                    setMatchingQuizFeedback(null);
                  }}
                  className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-emerald-700 shadow-xl transition-all flex items-center justify-center gap-3"
                >
                  CÂU TIẾP THEO <ChevronRight />
                </button>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  };

  const generatePlacementQuestion = async (step: number) => {
    setIsGeneratingPlacement(true);
    setPlacementFeedback(null);
    
    let targetLevel: Level = 'Tập sự';
    let focus = "";
    
    if (step <= 2) {
      targetLevel = 'Tập sự';
      focus = "Thì hiện tại, danh từ số ít/nhiều hoặc từ vựng đời sống.";
    } else if (step <= 4) {
      targetLevel = 'Thành thạo';
      focus = "Mệnh đề quan hệ, Cụm động từ (Phrasal Verbs) hoặc Thì hoàn thành.";
    } else {
      targetLevel = 'Tiến sĩ';
      focus = "Đảo ngữ, Câu điều kiện hỗn hợp hoặc Thể giả định. Lồng ghép chủ đề hiện đại (Công nghệ, Môi trường, Startup, Vi mạch).";
    }

    try {
      const prompt = `Bạn là "Ếch Trưởng Lão" – Giám khảo tối cao của đầm lầy Efrog. Hãy tạo Câu hỏi số ${step} cho bài Placement Test.
Trình độ mục tiêu: ${targetLevel}.
Trọng tâm: ${focus}.

Yêu cầu:
1. Ngữ cảnh hoàn toàn mới, độc bản, không trùng lặp.
2. Câu hỏi trắc nghiệm 4 lựa chọn.
3. Giải thích bằng tiếng Việt hóm hỉnh theo phong cách "ếch".

Cấu trúc JSON:
{
  "text": "string (câu hỏi tiếng Anh có chỗ trống)",
  "options": ["string", "string", "string", "string"],
  "correctAnswer": number (0-3),
  "explanation": "string (giải thích tiếng Việt hóm hỉnh)",
  "level": "${targetLevel}"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctAnswer: { type: Type.NUMBER },
              explanation: { type: Type.STRING },
              level: { type: Type.STRING }
            },
            required: ["text", "options", "correctAnswer", "explanation", "level"]
          }
        }
      });

      const data = JSON.parse(response.text || '{}');
      setCurrentPlacementQuestion(data);
    } catch (error) {
      console.error("Error generating placement question:", error);
      // Fallback
      setCurrentPlacementQuestion({
        text: "I _______ to the marsh every day.",
        options: ["go", "goes", "going", "is go"],
        correctAnswer: 0,
        explanation: "Ếch con ơi, 'I' thì đi với 'go' nguyên mẫu nhé! Quác!",
        level: 'Tập sự'
      });
    } finally {
      setIsGeneratingPlacement(false);
    }
  };

  const handleCompleteOnboarding = () => {
    const fullName = `Ếch ${tempLevel} ${tempNickname}`;
    const newUser: UserProfile = {
      email: tempEmail,
      nickname: tempNickname,
      level: tempLevel,
      fullName,
      tadpoles: 0,
      streak: 0,
      lastLessonDate: null,
      inventory: [],
      greenLotusLeaves: 0,
      notebook: [],
      hasSeenDay5Scenario: false
    };
    setUser(newUser);
    localStorage.setItem('efrog_user', JSON.stringify(newUser));
    setCurrentView('placement-test');
    setPlacementStep(1);
    generatePlacementQuestion(1);
  };

  const handleLogout = () => {
    localStorage.removeItem('efrog_user');
    setUser(null);
    setCurrentView('onboarding');
    setOnboardingStep(1);
  };

  const handleStartQuiz = async (quiz?: Quiz) => {
    if (!user) return;
    
    // If no quiz provided, we generate a dynamic one
    setIsGeneratingQuiz(true);
    setCurrentView('home'); // Stay on home while generating

    try {
      const prompt = `Bạn là Kỹ sư nội dung của Efrog. Hãy tạo một bộ đề thi "Luyện đề" ĐỘC BẢN cho trình độ ${user.level}.
Quy tắc:
1. Độc bản: Ngữ cảnh mới lạ, không dùng ví dụ sách giáo khoa.
2. Cấu trúc: 
   - 4 câu Trắc nghiệm (multiple-choice) về Ngữ pháp/Từ vựng.
   - 2 câu Tìm lỗi sai (multiple-choice).
   - 2 câu Đọc hiểu (reading - kèm passage).
   - 2 câu Viết lại câu (rewrite).
3. Độ khó: Phù hợp với cấp độ ${user.level}.
   - Cấp Ếch Tập: Cơ bản, xáo trộn từ.
   - Cấp Ếch Thông Thái: Phrasal verbs, đồng nghĩa.
   - Cấp Ếch Tiến Sĩ: Đảo ngữ, cấu trúc phức tạp.

Return JSON:
{
  "id": "dynamic-quiz-${Date.now()}",
  "title": "Đề Luyện Tập Độc Bản #${Math.floor(Math.random() * 10000)}",
  "level": "${user.level}",
  "questions": [
    {
      "id": "string",
      "type": "multiple-choice" | "reading" | "rewrite",
      "text": "string",
      "section": "string",
      "passage": "string" (optional),
      "options": ["string", "string", "string", "string"] (optional),
      "correctAnswer": "string" | number,
      "explanation": "string"
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite-preview", // Use lite for speed
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              level: { type: Type.STRING },
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    type: { type: Type.STRING },
                    text: { type: Type.STRING },
                    section: { type: Type.STRING },
                    passage: { type: Type.STRING },
                    options: { type: Type.ARRAY, items: { type: Type.STRING } },
                    correctAnswer: { type: Type.STRING },
                    explanation: { type: Type.STRING }
                  },
                  required: ["id", "type", "text", "correctAnswer", "explanation"]
                }
              }
            },
            required: ["id", "title", "level", "questions"]
          }
        }
      });

      const dynamicQuiz = JSON.parse(response.text || '{}') as Quiz;
      setSelectedQuiz(dynamicQuiz);
      setQuizAnswers(new Array(dynamicQuiz.questions.length).fill(null));
      setTimeLeft(1800); // 30 mins for 10 questions
      setIsTimerActive(true);
      setCurrentView('quiz');
    } catch (error) {
      console.error("Error generating quiz:", error);
      // Fallback to static quiz if generation fails
      if (quiz) {
        setSelectedQuiz(quiz);
        setQuizAnswers(new Array(quiz.questions.length).fill(null));
        setTimeLeft(3600);
        setIsTimerActive(true);
        setCurrentView('quiz');
      }
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  const handleAnswerQuiz = (questionIndex: number, answer: number | string) => {
    setLastInteractionTime(Date.now());
    const newAnswers = [...quizAnswers] as any[];
    newAnswers[questionIndex] = answer;
    setQuizAnswers(newAnswers);
  };

  const compareAnswers = async (userAnswer: any, correctAnswer: any, type: string, context?: string) => {
    if (userAnswer === null || userAnswer === undefined) return { isCorrect: false };
    if (type === 'rewrite') {
      return await checkAnswer(userAnswer as string, correctAnswer as string | string[], context);
    }
    const isCorrect = userAnswer === correctAnswer;
    return { isCorrect, status: isCorrect ? 'perfect' : 'incorrect' };
  };

  const calculateScore = async () => {
    if (!selectedQuiz) return { score: 0, total: 0, correctCount: 0, bonusTadpoles: 0 };
    let correctCount = 0;
    let bonusTadpoles = 0;
    
    for (let i = 0; i < selectedQuiz.questions.length; i++) {
      const q = selectedQuiz.questions[i];
      const result = await compareAnswers(quizAnswers[i], q.correctAnswer, q.type, q.text);
      if (result.isCorrect) {
        correctCount++;
        // Bonus for difficult grammar (Inversion/Clause)
        if (q.type === 'rewrite' || q.text.toLowerCase().includes('inversion') || q.text.toLowerCase().includes('clause')) {
          bonusTadpoles += 50;
        }
        // Add bonus from smart checker (e.g. penalty for typo)
        if ('bonusTadpoles' in result && result.bonusTadpoles) {
          bonusTadpoles += result.bonusTadpoles;
        }
      }
    }
    
    const score = Math.round((correctCount / selectedQuiz.questions.length) * 100);
    return { score, total: selectedQuiz.questions.length, correctCount, bonusTadpoles };
  };

  const handleFinishQuiz = async () => {
    setIsTimerActive(false);
    const result = await calculateScore();
    setQuizResult(result);
    const { correctCount, bonusTadpoles } = result;
    
    if (user) {
      const earnedTadpoles = (correctCount * 10) + bonusTadpoles;
      const today = new Date().toISOString().split('T')[0];
      let newStreak = user.streak;
      
      if (user.lastLessonDate !== today) {
        const lastDate = user.lastLessonDate ? new Date(user.lastLessonDate) : null;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        if (user.lastLessonDate === yesterdayStr) {
          newStreak += 1;
        } else if (!user.lastLessonDate) {
          newStreak = 1;
        } else {
          newStreak = 1;
        }
      }

      const updatedUser = {
        ...user,
        tadpoles: user.tadpoles + earnedTadpoles,
        streak: newStreak,
        lastLessonDate: today,
        hasSeenDay5Scenario: newStreak === 5 ? false : user.hasSeenDay5Scenario
      };

      // Auto-trigger if they just hit 5
      if (newStreak === 5 && !user.hasSeenDay5Scenario) {
        setShowDay5Scenario(true);
      }

      setUser(updatedUser);
      localStorage.setItem('efrog_user', JSON.stringify(updatedUser));
    }
    
    setCurrentView('quiz-result');
  };

  const handlePlacementAnswer = (answerIndex: number) => {
    setLastInteractionTime(Date.now());
    if (!user || !currentPlacementQuestion) return;
    
    const isCorrect = answerIndex === currentPlacementQuestion.correctAnswer;
    let feedback = "";
    let finished = false;
    let finalLevel: Level = currentPlacementQuestion.level;

    if (isCorrect) {
      if (placementStep === 6) {
        feedback = `Quác quác! Bái phục! Bạn đã vượt qua Thử thách Đầm lầy và chính thức trở thành Ếch Tiến Sĩ! Ta tặng bạn 100 Nòng nọc khởi nghiệp. 🐸🎓✨\n\nGiải thích: ${currentPlacementQuestion.explanation}`;
        finalLevel = 'Tiến sĩ';
        finished = true;
      } else {
        feedback = `Cú nhảy tuyệt vời! Bạn đã chinh phục được thử thách này. Hãy chuẩn bị cho cú nhảy tiếp theo nhé!\n\nGiải thích: ${currentPlacementQuestion.explanation}`;
      }
    } else {
      feedback = `Ôi trượt chân rồi! Bạn dừng lại ở cấp độ ${currentPlacementQuestion.level}. Đừng buồn, hãy rèn luyện thêm tại đầm lầy Efrog nhé!\n\nGiải thích: ${currentPlacementQuestion.explanation}`;
      finished = true;
      finalLevel = currentPlacementQuestion.level;
    }

    setPlacementFeedback(feedback);
    
    if (finished) {
      setIsPlacementFinished(true);
      setFinalPlacementLevel(finalLevel);
      // Update user level and give bonus if Doctor
      const bonus = (finalLevel === 'Tiến sĩ' && isCorrect) ? 100 : 0;
      const updatedUser = { 
        ...user, 
        level: finalLevel,
        tadpoles: user.tadpoles + bonus,
        fullName: `Ếch ${finalLevel} ${user.nickname}`
      };
      setUser(updatedUser);
      localStorage.setItem('efrog_user', JSON.stringify(updatedUser));
    }
  };

  const renderPlacementTest = () => {
    if (isGeneratingPlacement && !currentPlacementQuestion) {
      return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-emerald-700 font-bold animate-pulse">Ếch Trưởng Lão đang soạn đề... Quác!</p>
        </div>
      );
    }

    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-[40px] shadow-2xl border-4 border-emerald-100 max-w-2xl w-full space-y-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Trophy size={120} className="text-emerald-500" />
          </div>

          <div className="text-center space-y-4">
            <FrogMascot 
              className="w-32 h-32 mx-auto" 
              mood={placementFeedback ? (placementFeedback.includes('Ôi') ? 'sad' : 'cheering') : 'happy'} 
              level="Tiến sĩ"
            />
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-emerald-900">KIỂM TRA ĐẦU VÀO</h2>
              <p className="text-emerald-600 font-bold uppercase tracking-widest">Câu hỏi {placementStep} / 6</p>
            </div>
          </div>

          {!placementFeedback ? (
            <div className="space-y-8">
              {isGeneratingPlacement ? (
                <div className="py-12 flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                  <p className="text-emerald-700 font-bold">Đang tải câu hỏi tiếp theo...</p>
                </div>
              ) : currentPlacementQuestion && (
                <>
                  <div className="bg-emerald-50 p-8 rounded-3xl border-2 border-emerald-100 text-xl font-bold text-emerald-900 leading-relaxed text-center">
                    "{currentPlacementQuestion.text}"
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {currentPlacementQuestion.options.map((option, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handlePlacementAnswer(idx)}
                        className="p-5 bg-white border-2 border-emerald-100 rounded-2xl text-left font-bold text-emerald-800 hover:border-emerald-500 hover:bg-emerald-50 transition-all flex items-center gap-4"
                      >
                        <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 font-black">
                          {String.fromCharCode(65 + idx)}
                        </div>
                        {option}
                      </motion.button>
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8 text-center"
            >
              <div className={cn(
                "p-8 rounded-3xl border-2 space-y-4",
                placementFeedback.includes('Ôi') ? "bg-red-50 border-red-100 text-red-900" : "bg-emerald-50 border-emerald-100 text-emerald-900"
              )}>
                <p className="text-xl font-bold leading-relaxed whitespace-pre-wrap">
                  {placementFeedback}
                </p>
              </div>

              {isPlacementFinished ? (
                <div className="space-y-6">
                  <div className="bg-yellow-50 p-6 rounded-3xl border-2 border-yellow-100">
                    <p className="text-yellow-700 font-black text-sm uppercase tracking-widest mb-2">Kết quả cuối cùng</p>
                    <p className="text-3xl font-black text-yellow-900">Ếch {finalPlacementLevel}</p>
                  </div>
                  <button 
                    onClick={() => setCurrentView('home')}
                    className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-emerald-700 shadow-xl transition-all"
                  >
                    BẮT ĐẦU HÀNH TRÌNH
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => {
                    const next = placementStep + 1;
                    setPlacementStep(next);
                    generatePlacementQuestion(next);
                  }}
                  className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-emerald-700 shadow-xl transition-all flex items-center justify-center gap-3"
                >
                  CÂU TIẾP THEO <ChevronRight />
                </button>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  };

  const handleUpgradeLevel = () => {
    if (!user) return;
    let nextLevel: Level = user.level;
    if (user.level === 'Tập sự') nextLevel = 'Thành thạo';
    else if (user.level === 'Thành thạo') nextLevel = 'Tiến sĩ';

    const updatedUser = { 
      ...user, 
      level: nextLevel,
      fullName: `Ếch ${nextLevel} ${user.nickname}`
    };
    setUser(updatedUser);
    localStorage.setItem('efrog_user', JSON.stringify(updatedUser));
    setCurrentView('home');
  };

  const renderOnboarding = () => (
    <div className="min-h-[80vh] flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-[40px] shadow-2xl border-4 border-emerald-100 max-w-md w-full space-y-8"
      >
        <div className="text-center space-y-4">
          <FrogMascot 
            className="w-32 h-32 mx-auto" 
            mood={onboardingStep === 3 ? 'cheering' : 'happy'} 
            level={tempLevel}
          />
          <h2 className="text-3xl font-black text-emerald-800 tracking-tight">
            {onboardingStep === 1 && "Efrog - Jump into English."}
            {onboardingStep === 2 && "Chọn cấp độ"}
            {onboardingStep === 3 && "Sẵn sàng chưa?"}
          </h2>
        </div>

        {onboardingStep === 1 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-bold text-emerald-700 ml-1">Email Gmail của bạn</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400 w-5 h-5" />
                <input 
                  type="email"
                  placeholder="example@gmail.com"
                  value={tempEmail}
                  onChange={(e) => setTempEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-emerald-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white outline-none transition-all font-medium"
                />
              </div>
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-bold text-emerald-700 ml-1">Biệt danh cá nhân</label>
              <input 
                type="text"
                placeholder="Ví dụ: Anna, Bo, Bin..."
                value={tempNickname}
                onChange={(e) => setTempNickname(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-emerald-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white outline-none transition-all font-medium"
              />
            </div>
            <button 
              disabled={!tempEmail.includes('@') || !tempNickname}
              onClick={() => setOnboardingStep(2)}
              className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 disabled:opacity-50 transition-all shadow-lg shadow-emerald-100"
            >
              Tiếp tục
            </button>
          </div>
        )}

        {onboardingStep === 2 && (
          <div className="space-y-4">
            <p className="text-center text-emerald-600 font-medium mb-4">Hãy chọn cấp độ phù hợp với bạn nhất:</p>
            {[
              { id: 'Tập sự', label: 'Tập sự - Cơ bản', desc: 'Dành cho người mới bắt đầu' },
              { id: 'Thành thạo', label: 'Thành thạo - Thông hiểu', desc: 'Đã có nền tảng vững chắc' },
              { id: 'Tiến sĩ', label: 'Tiến sĩ - Nâng cao', desc: 'Chinh phục điểm 9, 10' }
            ].map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => setTempLevel(lvl.id as Level)}
                className={cn(
                  "w-full p-4 rounded-2xl border-2 text-left transition-all",
                  tempLevel === lvl.id 
                    ? "border-emerald-500 bg-emerald-50" 
                    : "border-emerald-50 hover:border-emerald-200"
                )}
              >
                <div className="font-bold text-emerald-900">{lvl.label}</div>
                <div className="text-xs text-emerald-600">{lvl.desc}</div>
              </button>
            ))}
            <div className="flex gap-3 pt-4">
              <button onClick={() => setOnboardingStep(1)} className="flex-1 py-4 font-bold text-emerald-600">Quay lại</button>
              <button 
                onClick={() => setOnboardingStep(3)}
                className="flex-[2] bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-100"
              >
                Xác nhận
              </button>
            </div>
          </div>
        )}

        {onboardingStep === 3 && (
          <div className="text-center space-y-6">
            <div className="p-6 bg-emerald-50 rounded-3xl border-2 border-dashed border-emerald-200">
              <p className="text-emerald-600 text-sm font-bold uppercase tracking-widest mb-2">Tên tài khoản của bạn:</p>
              <h3 className="text-2xl font-black text-emerald-800">Ếch {tempLevel} {tempNickname}</h3>
            </div>
            <p className="text-emerald-600 leading-relaxed">
              Tài khoản của bạn đã sẵn sàng! Bạn sẽ được học các bài học phù hợp với trình độ <b>{tempLevel}</b>.
            </p>
            <button 
              onClick={handleCompleteOnboarding}
              className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-100 flex items-center justify-center gap-2"
            >
              Bắt đầu học ngay <ChevronRight size={20} />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );

  const renderHome = () => {
    const filteredLessons = lessons.filter(l => l.level === user?.level);
    const filteredQuizzes = quizzes.filter(q => q.level === user?.level);

    return (
      <div className="space-y-8">
        <section className="bg-white p-8 rounded-[40px] border-2 border-emerald-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
          <FrogMascot className="w-32 h-32" mood="happy" level={user?.level} />
          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} /> Cấp độ: {user?.level}
            </div>
            <h1 className="text-3xl font-black text-emerald-900 leading-tight">
              Efrog - Jump into English. 🐸
            </h1>
            <p className="text-emerald-600 font-medium">
              "Cú nhảy tuyệt vời! Hãy cùng ta chinh phục những đỉnh cao mới trong ngày hôm nay nhé!" - Ếch Trưởng Lão 👴🐸
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCurrentView('vocabulary-lookup')}
            className="bg-emerald-900 p-6 rounded-3xl shadow-lg border-2 border-emerald-700 flex items-center gap-4 text-left group"
          >
            <div className="bg-emerald-800 p-4 rounded-2xl group-hover:bg-emerald-700 transition-colors">
              <Search className="text-emerald-400 w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-white">Tra Từ Vựng</h3>
              <p className="text-emerald-300">Giải nghĩa AI thông thái</p>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCurrentView('entertainment-hub')}
            className="bg-white p-6 rounded-3xl shadow-sm border-2 border-emerald-100 flex items-center gap-4 text-left group"
          >
            <div className="bg-emerald-100 p-4 rounded-2xl group-hover:bg-emerald-200 transition-colors">
              <Film className="text-emerald-600 w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-emerald-900">Giải trí</h3>
              <p className="text-emerald-600">Đầm lầy giải trí Efrog</p>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCurrentView('lessons')}
            className="bg-white p-6 rounded-3xl shadow-sm border-2 border-emerald-100 flex items-center gap-4 text-left group"
          >
            <div className="bg-emerald-100 p-4 rounded-2xl group-hover:bg-emerald-200 transition-colors">
              <BookOpen className="text-emerald-600 w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-emerald-900">Bài học ({filteredLessons.length})</h3>
              <p className="text-emerald-600">Kiến thức trình độ {user?.level}</p>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isGeneratingQuiz}
            onClick={() => handleStartQuiz(filteredQuizzes[0])}
            className="bg-white p-6 rounded-3xl shadow-sm border-2 border-emerald-100 flex items-center gap-4 text-left group disabled:opacity-50"
          >
            <div className="bg-emerald-100 p-4 rounded-2xl group-hover:bg-emerald-200 transition-colors">
              {isGeneratingQuiz ? (
                <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <GraduationCap className="text-emerald-600 w-8 h-8" />
              )}
            </div>
            <div>
              <h3 className="font-bold text-xl text-emerald-900">
                {isGeneratingQuiz ? "Đang tạo đề..." : "Luyện đề"}
              </h3>
              <p className="text-emerald-600">Đề thi độc bản, thay đổi liên tục</p>
            </div>
          </motion.button>
        </div>

        <section className="bg-emerald-900 text-white p-8 rounded-[40px] relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <h3 className="text-2xl font-black">Lộ trình nâng cấp</h3>
            <p className="text-emerald-200">
              {user?.level === 'Tiến sĩ' 
                ? "Chúc mừng! Bạn đã đạt cấp độ cao nhất tại Efrog. Hãy tiếp tục duy trì phong độ nhé!"
                : `Để nâng cấp lên cấp độ tiếp theo, bạn cần hoàn thành bài kiểm tra với số điểm từ 60% trở lên!`
              }
            </p>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-3 bg-emerald-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ 
                    width: user?.level === 'Tập sự' ? '33.33%' : user?.level === 'Thành thạo' ? '66.66%' : '100%' 
                  }}
                  className="h-full bg-emerald-400" 
                />
              </div>
              <span className="font-bold">
                {user?.level === 'Tập sự' ? '33%' : user?.level === 'Thành thạo' ? '66%' : '100%'}
              </span>
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 opacity-10 rotate-12">
            <FrogMascot className="w-60 h-60" level={user?.level} />
          </div>
        </section>
      </div>
    );
  };

  const renderLessons = () => {
    const filteredLessons = lessons.filter(l => l.level === user?.level);
    const grammarLessons = filteredLessons.filter(l => l.category === 'Grammar');
    const vocabLessons = filteredLessons.filter(l => l.category === 'Vocabulary');

    const handleLessonClick = (lesson: any) => {
      setSelectedLesson(lesson);
      setCurrentView('lesson-detail');
    };

    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => setCurrentView('home')} className="p-2 hover:bg-emerald-50 rounded-full">
            <ArrowLeft className="w-6 h-6 text-emerald-700" />
          </button>
          <h2 className="text-2xl font-bold text-emerald-900">Bài học trình độ {user?.level}</h2>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-black text-emerald-800 mb-4 flex items-center gap-2">
              <BookOpen className="text-blue-500" size={20} /> NGỮ PHÁP (GRAMMAR)
            </h3>
            <div className="grid gap-3">
              {grammarLessons?.map(lesson => (
                <LessonCard 
                  key={lesson.id} 
                  lesson={lesson} 
                  onClick={() => handleLessonClick(lesson)} 
                />
              ))}
              {grammarLessons.length === 0 && <p className="text-emerald-400 italic">Đang cập nhật bài học ngữ pháp...</p>}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-black text-emerald-800 mb-4 flex items-center gap-2">
              <GraduationCap className="text-purple-500" size={20} /> TỪ VỰNG (VOCABULARY)
            </h3>
            <div className="grid gap-3">
              {vocabLessons?.map(lesson => (
                <LessonCard 
                  key={lesson.id} 
                  lesson={lesson} 
                  onClick={() => handleLessonClick(lesson)} 
                />
              ))}
              {vocabLessons.length === 0 && <p className="text-emerald-400 italic">Đang cập nhật bài học từ vựng...</p>}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderLessonDetail = () => {
    if (!selectedLesson) return null;
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => setCurrentView('lessons')} className="p-2 hover:bg-emerald-50 rounded-full">
            <ArrowLeft className="w-6 h-6 text-emerald-700" />
          </button>
          <h2 className="text-2xl font-bold text-emerald-900">{selectedLesson.title}</h2>
        </div>
        
        <div className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-sm space-y-8">
          <div className="prose prose-emerald max-w-none">
            <p className="text-xl font-medium text-emerald-800 leading-relaxed border-l-4 border-emerald-500 pl-4">
              {selectedLesson.content}
            </p>
          </div>

          {selectedLesson.details && (
            <div className="space-y-4">
              <h4 className="text-lg font-black text-emerald-900 flex items-center gap-2">
                <Sparkles className="text-yellow-500" size={20} /> KIẾN THỨC CHI TIẾT
              </h4>
              <ul className="grid gap-3">
                {selectedLesson.details?.map((detail, i) => (
                  <li key={i} className="flex items-start gap-3 bg-emerald-50 p-4 rounded-2xl text-emerald-800 font-medium">
                    <div className="w-6 h-6 bg-emerald-200 text-emerald-700 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {selectedLesson.examples && (
            <div className="space-y-4">
              <h4 className="text-lg font-black text-emerald-900 flex items-center gap-2">
                <BookOpen className="text-blue-500" size={20} /> VÍ DỤ MINH HỌA
              </h4>
              <div className="grid gap-4">
                {selectedLesson.examples?.map((ex, i) => (
                  <div key={i} className="p-4 rounded-2xl border-2 border-dashed border-emerald-100 bg-white">
                    <p className="text-emerald-900 font-bold text-lg">"{ex.en}"</p>
                    <p className="text-emerald-600 italic">→ {ex.vi}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button 
          onClick={handleStartWarmup}
          className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 flex items-center justify-center gap-2 group"
        >
          <Flame className="group-hover:animate-bounce" />
          KHỞI ĐỘNG TRƯỚC KHI NHẢY (WARM-UP)
        </button>
      </div>
    );
  };

  const handleFinishWarmup = () => {
    if (!selectedWarmup) return;
    
    let score = 0;
    
    // Matching
    selectedWarmup.vocabulary.matching.forEach((m, i) => {
      if (warmupAnswers.matching[i] === m.definition) score++;
    });
    
    // Gap fill
    selectedWarmup.vocabulary.gapFill.forEach((g, i) => {
      if (warmupAnswers.gapFill[i].toLowerCase().trim() === g.answer.toLowerCase().trim()) score++;
    });
    
    // Error ID
    selectedWarmup.grammar.errorIdentification.forEach((e, i) => {
      if (warmupAnswers.errorId[i].toLowerCase().trim() === e.error.toLowerCase().trim()) score++;
    });
    
    // Transformation
    selectedWarmup.grammar.sentenceTransformation.forEach((t, i) => {
      if (warmupAnswers.transformation[i].toLowerCase().trim() === t.answer.toLowerCase().trim()) score++;
    });
    
    setWarmupScore(score);
    setIsWarmupFinished(true);
    
    if (score === 13) {
      setUser(prev => {
        if (!prev) return null;
        const updatedUser = { ...prev, tadpoles: prev.tadpoles + 20 };
        localStorage.setItem('efrog_user', JSON.stringify(updatedUser));
        return updatedUser;
      });
    }
  };

  const renderWarmup = () => {
    if (isGeneratingWarmup) {
      return (
        <div className="flex flex-col items-center justify-center py-20 space-y-6">
          <FrogMascot className="w-48 h-48 animate-bounce" mood="thinking" level={user?.level} />
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-emerald-800">Huấn luyện viên đang soạn bài...</h2>
            <p className="text-emerald-600 italic">"Khởi động kỹ để nhảy xa hơn nào! Đợi ta một chút..."</p>
          </div>
        </div>
      );
    }

    if (!selectedWarmup) return null;

    const totalItems = 13;
    const percentage = (warmupScore / totalItems) * 100;
    const isUnlocked = percentage >= 80;

    return (
      <div className="space-y-8 pb-24">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => setCurrentView('lesson-detail')} className="p-2 hover:bg-emerald-50 rounded-full">
            <ArrowLeft className="w-6 h-6 text-emerald-700" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-emerald-900">Khởi Động Trước Khi Nhảy</h2>
            <p className="text-emerald-600 font-medium">Lớp học của Huấn luyện viên Efrog</p>
          </div>
        </div>

        <div className="space-y-12">
          {/* Vocabulary Section */}
          <section className="space-y-8">
            <div className="flex items-center gap-2 text-blue-600 font-black uppercase tracking-widest">
              <GraduationCap size={24} /> 1. PHẦN TỪ VỰNG (VOCABULARY DRILL)
            </div>

            {/* Matching */}
            <div className="bg-white p-6 rounded-3xl border-2 border-blue-100 space-y-6">
              <h4 className="font-bold text-blue-800">Matching (Nối từ): Nối từ vựng với định nghĩa đúng</h4>
              <div className="grid gap-4">
                {selectedWarmup.vocabulary.matching.map((m, i) => (
                  <div key={i} className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                    <div className="w-full md:w-1/3 p-3 bg-blue-50 rounded-xl font-bold text-blue-700 border border-blue-200">
                      {m.word}
                    </div>
                    <div className="flex-1 w-full">
                      <select 
                        disabled={isWarmupFinished}
                        value={warmupAnswers.matching[i]}
                        onChange={(e) => {
                          setLastInteractionTime(Date.now());
                          const newMatching = [...warmupAnswers.matching];
                          newMatching[i] = e.target.value;
                          setWarmupAnswers({ ...warmupAnswers, matching: newMatching });
                        }}
                        className="w-full p-3 rounded-xl border-2 border-emerald-100 focus:border-blue-500 outline-none transition-all text-sm"
                      >
                        <option value="">Chọn định nghĩa...</option>
                        {selectedWarmup.vocabulary.matching.map((opt, idx) => (
                          <option key={idx} value={opt.definition}>{opt.definition}</option>
                        ))}
                      </select>
                    </div>
                    {isWarmupFinished && (
                      <div className="shrink-0">
                        {warmupAnswers.matching[i] === m.definition ? (
                          <CheckCircle2 className="text-emerald-500" />
                        ) : (
                          <div className="flex items-center gap-2">
                            <XCircle className="text-red-500" />
                            <span className="text-xs text-emerald-600 font-bold">Đúng: {m.definition}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Gap Fill */}
            <div className="bg-white p-6 rounded-3xl border-2 border-blue-100 space-y-6">
              <h4 className="font-bold text-blue-800">Gap-fill (Điền vào chỗ trống): Sử dụng từ vựng trong ngữ cảnh</h4>
              <div className="space-y-6">
                {selectedWarmup.vocabulary.gapFill.map((g, i) => (
                  <div key={i} className="space-y-3">
                    <p className="text-emerald-900 font-medium leading-relaxed">
                      {g.sentence.split('___').map((part, index, array) => (
                        <React.Fragment key={index}>
                          {part}
                          {index < array.length - 1 && (
                            <span className="inline-block mx-2">
                              <input 
                                disabled={isWarmupFinished}
                                type="text"
                                value={warmupAnswers.gapFill[i]}
                                onChange={(e) => {
                                  setLastInteractionTime(Date.now());
                                  const newGapFill = [...warmupAnswers.gapFill];
                                  newGapFill[i] = e.target.value;
                                  setWarmupAnswers({ ...warmupAnswers, gapFill: newGapFill });
                                }}
                                className="border-b-2 border-blue-300 outline-none px-2 py-1 text-blue-700 font-bold bg-transparent w-32 text-center"
                                placeholder="..."
                              />
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {g.options.map((opt, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg font-bold">
                          {opt}
                        </span>
                      ))}
                    </div>
                    {isWarmupFinished && (
                      <div className="flex items-center gap-2 mt-2">
                        {warmupAnswers.gapFill[i].toLowerCase().trim() === g.answer.toLowerCase().trim() ? (
                          <CheckCircle2 className="text-emerald-500" size={18} />
                        ) : (
                          <>
                            <XCircle className="text-red-500" size={18} />
                            <span className="text-sm text-emerald-600 font-bold">Đáp án: {g.answer}</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Grammar Section */}
          <section className="space-y-8">
            <div className="flex items-center gap-2 text-purple-600 font-black uppercase tracking-widest">
              <BookOpen size={24} /> 2. PHẦN NGỮ PHÁP (GRAMMAR DRILL)
            </div>

            {/* Error ID */}
            <div className="bg-white p-6 rounded-3xl border-2 border-purple-100 space-y-6">
              <h4 className="font-bold text-purple-800">Error Identification (Tìm lỗi sai): Tìm từ/cụm từ bị sai</h4>
              <div className="space-y-6">
                {selectedWarmup.grammar.errorIdentification.map((e, i) => (
                  <div key={i} className="space-y-3 p-4 rounded-2xl bg-purple-50/50">
                    <p className="text-emerald-900 font-bold">"{e.sentence}"</p>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-purple-600 uppercase">Nhập từ bị sai:</label>
                      <input 
                        disabled={isWarmupFinished}
                        type="text"
                        value={warmupAnswers.errorId[i]}
                        onChange={(e) => {
                          setLastInteractionTime(Date.now());
                          const newErrorId = [...warmupAnswers.errorId];
                          newErrorId[i] = e.target.value;
                          setWarmupAnswers({ ...warmupAnswers, errorId: newErrorId });
                        }}
                        className="p-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 outline-none transition-all"
                        placeholder="Ví dụ: 'have' thay vì 'has'..."
                      />
                    </div>
                    {isWarmupFinished && (
                      <div className="mt-4 p-4 bg-white rounded-xl border border-purple-100 space-y-2">
                        <div className="flex items-center gap-2">
                          {warmupAnswers.errorId[i].toLowerCase().trim() === e.error.toLowerCase().trim() ? (
                            <CheckCircle2 className="text-emerald-500" size={18} />
                          ) : (
                            <XCircle className="text-red-500" size={18} />
                          )}
                          <span className="font-bold text-emerald-900">Lỗi: {e.error} → Sửa lại: {e.correction}</span>
                        </div>
                        <div className="text-sm text-emerald-600 italic flex gap-2">
                          <Sparkles className="text-yellow-500 shrink-0" size={16} />
                          <span>Quick Tip: {e.tip}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Transformation */}
            <div className="bg-white p-6 rounded-3xl border-2 border-purple-100 space-y-6">
              <h4 className="font-bold text-purple-800">Sentence Transformation (Viết lại câu): Chuyển đổi cấu trúc cơ bản</h4>
              <div className="space-y-6">
                {selectedWarmup.grammar.sentenceTransformation.map((t, i) => (
                  <div key={i} className="space-y-3 p-4 rounded-2xl bg-purple-50/50">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-purple-400 uppercase">Câu gốc:</p>
                      <p className="text-emerald-900 font-medium italic">"{t.original}"</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-purple-600 uppercase">Viết lại với: <span className="text-emerald-700">{t.prompt}</span></label>
                      <textarea 
                        disabled={isWarmupFinished}
                        value={warmupAnswers.transformation[i]}
                        onChange={(e) => {
                          setLastInteractionTime(Date.now());
                          const newTrans = [...warmupAnswers.transformation];
                          newTrans[i] = e.target.value;
                          setWarmupAnswers({ ...warmupAnswers, transformation: newTrans });
                        }}
                        className="p-3 rounded-xl border-2 border-purple-100 focus:border-purple-500 outline-none transition-all h-20 resize-none"
                        placeholder="Nhập câu viết lại..."
                      />
                    </div>
                    {isWarmupFinished && (
                      <div className="mt-4 p-4 bg-white rounded-xl border border-purple-100 space-y-2">
                        <div className="flex items-center gap-2">
                          {warmupAnswers.transformation[i].toLowerCase().trim() === t.answer.toLowerCase().trim() ? (
                            <CheckCircle2 className="text-emerald-500" size={18} />
                          ) : (
                            <XCircle className="text-red-500" size={18} />
                          )}
                          <span className="font-bold text-emerald-900">Đáp án đúng: {t.answer}</span>
                        </div>
                        <div className="text-sm text-emerald-600 italic flex gap-2">
                          <Sparkles className="text-yellow-500 shrink-0" size={16} />
                          <span>Quick Tip: {t.tip}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-emerald-100 flex justify-center z-20">
          <div className="max-w-4xl w-full flex gap-4">
            {!isWarmupFinished ? (
              <button 
                onClick={handleFinishWarmup}
                className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
              >
                NỘP BÀI KHỞI ĐỘNG
              </button>
            ) : (
              <div className="flex-1 flex flex-col md:flex-row gap-4 items-center justify-between bg-emerald-50 p-4 rounded-2xl border-2 border-emerald-200">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-black text-emerald-900">{warmupScore}/13</div>
                    <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Điểm số</div>
                  </div>
                  <div className="h-10 w-px bg-emerald-200" />
                  <div>
                    <div className="text-sm font-bold text-emerald-800">
                      {warmupScore === 13 ? "TUYỆT VỜI! +20 Nòng nọc" : isUnlocked ? "Khởi động tốt! Đã sẵn sàng nhảy." : "Chưa đủ nóng! Hãy xem lại Quick Tips."}
                    </div>
                    <div className="text-xs text-emerald-600">
                      Cần đạt ít nhất 80% (11/13) để mở khóa luyện đề.
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 w-full md:w-auto">
                  <button 
                    onClick={() => {
                      setIsWarmupFinished(false);
                      setWarmupAnswers({
                        matching: Array(5).fill(''),
                        gapFill: Array(3).fill(''),
                        errorId: Array(3).fill(''),
                        transformation: Array(2).fill(''),
                      });
                    }}
                    className="flex-1 md:flex-none px-6 py-3 bg-white text-emerald-600 rounded-xl font-bold border border-emerald-200 hover:bg-emerald-50 transition-all"
                  >
                    LÀM LẠI
                  </button>
                  {isUnlocked && (
                    <button 
                      onClick={() => {
                        const quiz = quizzes.find(q => q.title.includes(selectedLesson.title)) || quizzes[0];
                        setSelectedQuiz(quiz);
                        setQuizAnswers(Array(quiz.questions.length).fill(''));
                        setTimeLeft(3600);
                        setIsTimerActive(true);
                        setCurrentView('quiz');
                      }}
                      className="flex-1 md:flex-none px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 flex items-center gap-2"
                    >
                      VÀO LUYỆN ĐỀ <ChevronRight size={18} />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderQuiz = () => {
    if (!selectedQuiz) return null;
    
    const answeredCount = quizAnswers.filter(a => a !== undefined && a !== null && a !== '').length;
    const progress = (answeredCount / selectedQuiz.questions.length) * 100;

    return (
      <div className="space-y-8 pb-24">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-emerald-50/90 backdrop-blur-md p-4 -mx-4 sm:-mx-6 border-b border-emerald-100 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => { setIsTimerActive(false); setCurrentView('home'); }} className="p-2 hover:bg-emerald-100 rounded-full transition-colors">
              <ChevronLeft className="text-emerald-700" />
            </button>
            <div>
              <h2 className="text-lg font-bold text-emerald-900 leading-tight">{selectedQuiz.title}</h2>
              <div className="flex items-center gap-2 text-sm text-emerald-600">
                <Clock size={14} />
                <span className={cn("font-mono font-bold", timeLeft < 300 ? "text-red-500 animate-pulse" : "")}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-emerald-500 mb-1">{Math.round(progress)}% Hoàn thành</div>
            <div className="w-24 h-2 bg-emerald-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-emerald-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-12 mt-4">
          {selectedQuiz.questions?.map((q, qIndex) => {
            const showSection = qIndex === 0 || q.section !== selectedQuiz.questions[qIndex - 1].section;
            const showPassage = q.passage && (qIndex === 0 || q.passage !== selectedQuiz.questions[qIndex - 1].passage);

            return (
              <div key={q.id} className="space-y-6">
                {showSection && (
                  <div className="bg-emerald-700 text-white px-6 py-3 rounded-2xl font-black text-sm tracking-widest shadow-md inline-block">
                    {q.section}
                  </div>
                )}

                <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 opacity-20" />
                  
                  {showPassage && (
                    <div className="p-5 bg-emerald-50 rounded-2xl border-2 border-emerald-100 text-emerald-800 italic mb-6 leading-relaxed">
                      <div className="flex items-center gap-2 mb-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
                        <BookOpen size={16} /> Đọc đoạn văn sau:
                      </div>
                      {q.passage}
                    </div>
                  )}

                  <div className="flex gap-4">
                    <span className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold shrink-0">
                      {qIndex + 1}
                    </span>
                    <p className="text-lg font-bold text-emerald-900 pt-0.5">{q.text}</p>
                  </div>
                  
                  {q.type === 'rewrite' ? (
                    <div className="ml-12">
                      <input 
                        type="text"
                        placeholder="Nhập câu trả lời của bạn..."
                        value={quizAnswers[qIndex] || ''}
                        onChange={(e) => handleAnswerQuiz(qIndex, e.target.value)}
                        className="w-full px-6 py-4 rounded-2xl bg-emerald-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white outline-none transition-all font-medium shadow-inner"
                      />
                    </div>
                  ) : (
                    <div className="grid gap-3 ml-12">
                      {q.options?.map((opt, optIndex) => (
                        <button
                          key={optIndex}
                          onClick={() => handleAnswerQuiz(qIndex, optIndex)}
                          className={cn(
                            "w-full text-left p-4 rounded-2xl border-2 transition-all font-medium flex items-center gap-3",
                            quizAnswers[qIndex] === optIndex 
                              ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm" 
                              : "border-emerald-50 bg-white text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50/30"
                          )}
                        >
                          <div className={cn(
                            "w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold",
                            quizAnswers[qIndex] === optIndex ? "border-emerald-500 bg-emerald-500 text-white" : "border-emerald-200 text-emerald-300"
                          )}>
                            {String.fromCharCode(65 + optIndex)}
                          </div>
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-emerald-100 flex justify-center">
          <button
            disabled={answeredCount < (selectedQuiz.questions.length || 0)}
            onClick={handleFinishQuiz}
            className="w-full max-w-md bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-emerald-200 flex items-center justify-center gap-2"
          >
            <Send size={20} /> Nộp bài ngay!
          </button>
        </div>
      </div>
    );
  };

  const renderQuizResult = () => {
    if (!selectedQuiz || !quizResult) return null;
    const { score, total, bonusTadpoles } = quizResult;
    const percentage = score; // score is already percentage in calculateScore
    const canUpgrade = percentage >= 60 && user?.level !== 'Tiến sĩ';
    const earnedTadpoles = (score * 10) + bonusTadpoles;

    // Analyze performance by section
    const sectionAnalysis: Record<string, { correct: number, total: number }> = {};
    selectedQuiz.questions?.forEach((q, idx) => {
      const section = q.section || 'Khác';
      if (!sectionAnalysis[section]) sectionAnalysis[section] = { correct: 0, total: 0 };
      
      const isCorrect = compareAnswers(quizAnswers[idx], q.correctAnswer, q.type);
      
      sectionAnalysis[section].total++;
      if (isCorrect) sectionAnalysis[section].correct++;
    });

    const strengths = Object.entries(sectionAnalysis)
      .filter(([_, stats]) => (stats.correct / stats.total) >= 0.8)
      .map(([name]) => name);
    
    const weaknesses = Object.entries(sectionAnalysis)
      .filter(([_, stats]) => (stats.correct / stats.total) < 0.6)
      .map(([name]) => name);

    return (
      <div className="text-center space-y-8 py-8">
        <FrogMascot className="w-48 h-48 mx-auto" mood={percentage >= 80 ? 'cheering' : 'thinking'} level={user?.level} />
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-emerald-900">
            {percentage === 100 ? 'TUYỆT ĐỐI 100%!' : percentage >= 80 ? 'Rất tốt!' : percentage >= 60 ? 'Đạt yêu cầu!' : 'Cần cố gắng thêm!'}
          </h2>
          <p className="text-emerald-600 text-xl">
            Bạn đã đạt được <span className="font-bold text-emerald-700">{score}/{total}</span> câu đúng ({Math.round(percentage)}%).
          </p>
          {earnedTadpoles > 0 && (
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-bold animate-bounce mt-4">
              <Coins size={20} /> +{earnedTadpoles} Nòng nọc
              {bonusTadpoles > 0 && <span className="text-xs ml-1">(Bao gồm +{bonusTadpoles} thưởng thần sầu!)</span>}
            </div>
          )}
        </div>

        {/* Strength & Weakness Analysis */}
        <div className="bg-white p-6 rounded-3xl border-2 border-emerald-100 shadow-sm text-left space-y-6 max-w-2xl mx-auto">
          <h3 className="text-xl font-black text-emerald-900 flex items-center gap-2">
            <Trophy className="text-yellow-500" /> PHÂN TÍCH NĂNG LỰC
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-bold text-emerald-700 flex items-center gap-2">
                <CheckCircle2 className="text-emerald-500" size={18} /> Điểm mạnh
              </h4>
              {strengths.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {strengths?.map(s => (
                    <span key={s} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">
                      {s}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-emerald-400 italic">Hãy luyện tập thêm để tạo đột phá!</p>
              )}
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-red-700 flex items-center gap-2">
                <XCircle className="text-red-500" size={18} /> Cần cải thiện
              </h4>
              {weaknesses.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {weaknesses?.map(w => (
                    <span key={w} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                      {w}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-emerald-400 italic">Bạn đang làm rất tốt các phần!</p>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-emerald-50">
            <p className="text-sm text-emerald-600 leading-relaxed">
              <b>Lời khuyên từ Efrog:</b> {weaknesses.length > 0 
                ? `Bạn nên tập trung ôn tập lại phần ${weaknesses[0]} để cải thiện điểm số trong lần tới.` 
                : "Phong độ của bạn rất ổn định, hãy thử thách bản thân ở cấp độ cao hơn!"}
            </p>
          </div>
        </div>

        {canUpgrade && (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-yellow-50 border-2 border-yellow-200 p-6 rounded-3xl space-y-4 max-w-2xl mx-auto"
          >
            <h3 className="text-xl font-bold text-yellow-800 flex items-center justify-center gap-2">
              <Sparkles className="text-yellow-500" /> ĐỦ ĐIỀU KIỆN NÂNG CẤP!
            </h3>
            <p className="text-yellow-700 font-medium">
              Bạn đã đạt trên 60% số câu đúng. Bạn có muốn nâng cấp lên trình độ tiếp theo không?
            </p>
            <button 
              onClick={handleUpgradeLevel}
              className="w-full bg-yellow-500 text-white py-3 rounded-xl font-bold hover:bg-yellow-600 transition-all shadow-lg shadow-yellow-100"
            >
              Nâng cấp ngay!
            </button>
          </motion.div>
        )}

        <div className="space-y-4 max-w-md mx-auto">
          {selectedQuiz.questions?.map((q, idx) => {
            const isCorrect = compareAnswers(quizAnswers[idx], q.correctAnswer, q.type);

            return (
              <div key={q.id} className="bg-white p-4 rounded-2xl border border-emerald-100 space-y-2 text-left">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-900">Câu {idx + 1}</span>
                  {isCorrect ? (
                    <CheckCircle2 className="text-emerald-500" />
                  ) : (
                    <XCircle className="text-red-500" />
                  )}
                </div>
                <div className="text-sm space-y-1">
                  {!isCorrect && (
                    <>
                      <p className="text-red-500">Đáp án của bạn: {q.type === 'rewrite' ? (quizAnswers[idx] || '(Trống)') : q.options?.[quizAnswers[idx] as number]}</p>
                      <p className="text-emerald-600 font-bold">Đáp án đúng: {q.type === 'rewrite' ? q.correctAnswer : q.options?.[q.correctAnswer as number]}</p>
                    </>
                  )}
                  {isCorrect && q.type === 'rewrite' && (
                    <p className="text-emerald-600">Đáp án của bạn: {quizAnswers[idx]}</p>
                  )}
                  {q.explanation && <p className="text-emerald-500 italic mt-1">💡 {q.explanation}</p>}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setCurrentView('home')}
            className="flex-1 bg-white border-2 border-emerald-600 text-emerald-600 py-4 rounded-2xl font-bold hover:bg-emerald-50 transition-all"
          >
            Về trang chủ
          </button>
          <button
            onClick={() => handleStartQuiz(selectedQuiz)}
            className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
          >
            Làm lại
          </button>
        </div>
      </div>
    );
  };

  const STORE_ITEMS = [
    { id: 'goggles', name: 'Kính bơi (Ếch Tập)', price: 200, icon: '🤿', description: 'Giúp bạn nhìn rõ hơn dưới đầm lầy tri thức.' },
    { id: 'grad_cap', name: 'Mũ cử nhân (Ếch Tiến Sĩ)', price: 500, icon: '🎓', description: 'Biểu tượng của sự thông thái đỉnh cao.' },
    { id: 'giant_leaf', name: 'Lá sen khổng lồ', price: 1000, icon: '⛱️', description: 'Chiếc ô che nắng sang chảnh nhất đầm lầy.' },
  ];

  const handleBuyItem = (item: typeof STORE_ITEMS[0]) => {
    if (!user) return;
    if (user.tadpoles < item.price) {
      alert("Bạn chưa đủ Nòng nọc rồi! Hãy nhảy đi học thêm nhé! 🐸");
      return;
    }
    if (user.inventory.includes(item.id)) {
      alert("Bạn đã sở hữu vật phẩm này rồi! 🐸");
      return;
    }

    const updatedUser = {
      ...user,
      tadpoles: user.tadpoles - item.price,
      inventory: [...user.inventory, item.id]
    };
    setUser(updatedUser);
    localStorage.setItem('efrog_user', JSON.stringify(updatedUser));
    alert(`Chúc mừng! Bạn đã sở hữu ${item.name}! 🎉`);
  };

  const renderStore = () => {
    return (
      <div className="space-y-8 py-4">
        <div className="flex items-center justify-between bg-emerald-900 text-white p-6 rounded-3xl shadow-xl">
          <div>
            <h2 className="text-2xl font-black">Cửa Hàng Đầm Lầy</h2>
            <p className="text-emerald-300 opacity-80">Trang trí cho chú ếch của bạn</p>
          </div>
          <div className="bg-emerald-800 px-4 py-2 rounded-2xl flex items-center gap-2 border border-emerald-700">
            <Coins className="text-yellow-400" />
            <span className="text-xl font-bold">{user?.tadpoles || 0}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STORE_ITEMS.map(item => (
            <div key={item.id} className="bg-white p-6 rounded-3xl border-2 border-emerald-100 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col">
              <div className="text-6xl text-center py-4 bg-emerald-50 rounded-2xl">{item.icon}</div>
              <div className="flex-1 space-y-2">
                <h3 className="font-bold text-emerald-900 text-lg">{item.name}</h3>
                <p className="text-sm text-emerald-600">{item.description}</p>
              </div>
              <button
                onClick={() => handleBuyItem(item)}
                disabled={user?.inventory.includes(item.id)}
                className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                  user?.inventory.includes(item.id) 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-100'
                }`}
              >
                {user?.inventory.includes(item.id) ? 'Đã sở hữu' : (
                  <>
                    <Coins size={18} /> {item.price}
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSmartTranslator = () => (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => setCurrentView('entertainment-hub')} className="p-2 hover:bg-emerald-50 rounded-full">
            <ArrowLeft className="w-6 h-6 text-emerald-700" />
          </button>
          <h2 className="text-2xl font-bold text-emerald-900">Trình Thông Dịch & Sổ Tay</h2>
        </div>
        <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-2xl border-2 border-yellow-200">
          <BookOpen className="text-yellow-600" size={20} />
          <span className="font-bold text-yellow-700">{user?.notebook?.length || 0} Từ đã lưu</span>
        </div>
      </div>

      <section className="bg-white p-8 rounded-[40px] border-2 border-emerald-100 shadow-sm space-y-6">
        <div className="space-y-4">
          <h3 className="text-xl font-black text-emerald-900">Văn bản cần phân tích:</h3>
          <div className="p-6 bg-emerald-50 rounded-3xl text-emerald-800 italic leading-relaxed border border-emerald-100">
            {translatorInput}
          </div>
        </div>

        {isAnalyzing && (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-emerald-700 font-bold animate-pulse">Ếch Thông Thái đang phân tích ngữ cảnh...</p>
          </div>
        )}

        {translationResult && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-3xl border-2 border-blue-100 space-y-3">
                <h4 className="font-black text-blue-800 flex items-center gap-2">
                  <Languages size={18} /> DỊCH SÁT NGHĨA (LITERAL)
                </h4>
                <p className="text-blue-700 leading-relaxed">{translationResult.literal}</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-3xl border-2 border-purple-100 space-y-3">
                <h4 className="font-black text-purple-800 flex items-center gap-2">
                  <Sparkles size={18} /> DỊCH THOÁT Ý (IDIOMATIC)
                </h4>
                <p className="text-purple-700 leading-relaxed">{translationResult.idiomatic}</p>
              </div>
            </div>

            <div className="bg-emerald-900 p-8 rounded-[40px] text-white space-y-4">
              <h4 className="font-black flex items-center gap-2 text-emerald-400">
                <GraduationCap size={20} /> PHÂN TÍCH NGỮ PHÁP
              </h4>
              <p className="text-emerald-100 leading-relaxed whitespace-pre-wrap">{translationResult.grammarAnalysis}</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="font-black text-emerald-900 text-xl flex items-center gap-2">
                  <Leaf size={24} className="text-emerald-500" /> STICKY VOCAB (TỪ VỰNG ĐẮT GIÁ)
                </h4>
                {savedWordsCount > 0 && (
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold animate-bounce">
                    +{savedWordsCount * 5} Nòng nọc!
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {translationResult.stickyNotes.map((note, idx) => {
                  const isSaved = user?.notebook?.some(n => n.word.toLowerCase() === note.word.toLowerCase());
                  const colors = [
                    'bg-yellow-100 border-yellow-200 text-yellow-900',
                    'bg-pink-100 border-pink-200 text-pink-900',
                    'bg-blue-100 border-blue-200 text-blue-900',
                    'bg-orange-100 border-orange-200 text-orange-900',
                    'bg-emerald-100 border-emerald-200 text-emerald-900'
                  ];
                  const colorClass = colors[idx % colors.length];

                  return (
                    <motion.div 
                      key={note.id}
                      whileHover={{ rotate: idx % 2 === 0 ? 1 : -1, scale: 1.02 }}
                      className={cn("p-6 rounded-2xl border-2 shadow-lg relative transform", colorClass)}
                    >
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-white/50 rounded-full flex items-center justify-center">📌</div>
                      <div className="space-y-3">
                        <div>
                          <h5 className="text-xl font-black">{note.word}</h5>
                          <p className="text-xs opacity-70 font-mono">{note.phonetic}</p>
                        </div>
                        <p className="font-bold border-t border-black/10 pt-2">{note.meaning}</p>
                        <p className="text-sm italic opacity-80 leading-relaxed">"{note.example}"</p>
                        <div className="text-[10px] space-y-1 opacity-70">
                          <p><b>Syn:</b> {note.synonyms.join(', ')}</p>
                          <p><b>Ant:</b> {note.antonyms.join(', ')}</p>
                        </div>
                        <button 
                          onClick={() => saveToNotebook(note)}
                          disabled={isSaved}
                          className={cn(
                            "w-full py-2 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2",
                            isSaved ? "bg-black/10 text-black/40 cursor-not-allowed" : "bg-black/10 hover:bg-black/20 text-black"
                          )}
                        >
                          {isSaved ? <CheckCircle2 size={16} /> : <Coins size={16} />}
                          {isSaved ? "ĐÃ LƯU" : "LƯU VÀO SỔ TAY (+5)"}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </section>
    </div>
  );

  const renderNotebook = () => {
    const handleReviewReward = () => {
      if (!user) return;
      const updatedUser = { ...user, tadpoles: user.tadpoles + 5 };
      setUser(updatedUser);
      localStorage.setItem('efrog_user', JSON.stringify(updatedUser));
    };

    return (
      <div className="space-y-8 pb-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={() => setCurrentView('home')} className="p-2 hover:bg-emerald-50 rounded-full">
              <ArrowLeft className="w-6 h-6 text-emerald-700" />
            </button>
            <h2 className="text-2xl font-bold text-emerald-900">Sổ Tay Ếch Thông Thái</h2>
          </div>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={handleReviewReward}
            className="flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-2xl border-2 border-emerald-200 hover:bg-emerald-200 transition-all"
          >
            <Flame className="text-orange-500" size={20} />
            <span className="font-bold text-emerald-700">Ôn tập nhận +5 Nòng nọc!</span>
          </motion.button>
        </div>

        {!user?.notebook || user.notebook.length === 0 ? (
          <section className="bg-white p-12 rounded-[40px] text-center space-y-6 border-2 border-dashed border-emerald-200">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
              <BookOpen className="text-emerald-300 w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-emerald-900">Sổ tay còn trống</h3>
              <p className="text-emerald-600 max-w-xs mx-auto">
                Hãy sử dụng tính năng "Phân tích" trong Đầm Lầy Giải Trí để lưu lại những từ vựng hay nhé!
              </p>
            </div>
            <button 
              onClick={() => setCurrentView('entertainment-hub')}
              className="bg-emerald-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-emerald-700 transition-all"
            >
              Đến Đầm Lầy Vui Nhộn
            </button>
          </section>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.notebook.map((note, idx) => {
              const colors = [
                'bg-yellow-100 border-yellow-200 text-yellow-900',
                'bg-pink-100 border-pink-200 text-pink-900',
                'bg-blue-100 border-blue-200 text-blue-900',
                'bg-orange-100 border-orange-200 text-orange-900',
                'bg-emerald-100 border-emerald-200 text-emerald-900'
              ];
              const colorClass = colors[idx % colors.length];

              return (
                <motion.div 
                  key={note.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className={cn("p-6 rounded-2xl border-2 shadow-sm relative group", colorClass)}
                >
                  {note.needsPractice && (
                    <div className="absolute -top-2 -left-2 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-lg z-10 animate-pulse">
                      CẦN LUYỆN TẬP
                    </div>
                  )}
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="text-xl font-black">{note.word}</h5>
                        <p className="text-xs opacity-70 font-mono">{note.phonetic}</p>
                      </div>
                      <button 
                        onClick={() => speak(note.word)}
                        className="p-2 bg-white/50 rounded-full hover:bg-white transition-all"
                      >
                        <Volume2 size={16} />
                      </button>
                    </div>
                    <p className="font-bold border-t border-black/10 pt-2">{note.meaning}</p>
                    <p className="text-sm italic opacity-80 leading-relaxed">"{note.example}"</p>
                    <div className="text-[10px] space-y-1 opacity-70">
                      <p><b>Syn:</b> {note.synonyms.join(', ')}</p>
                      <p><b>Ant:</b> {note.antonyms.join(', ')}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {user?.notebook && user.notebook.length > 0 && (
          <div className="bg-emerald-900 p-8 rounded-[40px] text-white text-center space-y-4">
            <h4 className="text-xl font-black">Sẵn sàng cho bài kiểm tra cuối tuần?</h4>
            <p className="text-emerald-300">Hệ thống sẽ tự động tạo bài Quiz dựa trên {user.notebook.length} từ vựng bạn đã lưu.</p>
            <button 
              onClick={() => generateMatchingQuiz()}
              className="bg-emerald-500 text-emerald-950 px-8 py-3 rounded-2xl font-bold hover:bg-emerald-400 transition-all flex items-center gap-2 mx-auto"
            >
              <Dices size={20} /> THỬ THÁCH NỐI TỪ NGAY
            </button>
          </div>
        )}
      </div>
    );
  };

  const [showDay5Scenario, setShowDay5Scenario] = useState(false);
  const [scenarioStep, setScenarioStep] = useState(0);
  const [scenarioAnswer, setScenarioAnswer] = useState('');
  const [scenarioFeedback, setScenarioFeedback] = useState('');

  const renderDay5Scenario = () => {
    if (!showDay5Scenario) return null;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-emerald-950/80 backdrop-blur-sm">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white w-full max-w-lg rounded-[40px] overflow-hidden shadow-2xl relative"
        >
          <div className="bg-emerald-600 p-8 text-center text-white relative">
            <div className="absolute top-4 right-4">
              <button onClick={() => setShowDay5Scenario(false)} className="text-white/50 hover:text-white"><X size={24} /></button>
            </div>
            <FrogMascot className="w-32 h-32 mx-auto mb-4" mood="cheering" level={user?.level} />
            <h2 className="text-3xl font-black">NGÀY THỨ 5 RỰC RỠ!</h2>
            <p className="text-emerald-100">Lá sen thứ 5 đã được thắp sáng!</p>
          </div>

          <div className="p-8 space-y-6">
            {scenarioStep === 0 ? (
              <div className="space-y-4">
                <p className="text-emerald-800 leading-relaxed italic">
                  "Quác quác! Chúc mừng bạn đã kiên trì đến ngày thứ 5. Đầm sen đang dần trở nên rực rỡ hơn bao giờ hết! Bạn đã tích lũy được một lượng Nòng nọc kha khá rồi đấy."
                </p>
                <p className="text-emerald-800">
                  <b>Ếch Trưởng Lão:</b> "Trước khi ghé thăm Cửa Hàng Đầm Lầy, ta có một thử thách nhỏ cho bạn. Nếu vượt qua, ta sẽ tặng bạn thêm 100 Nòng nọc!"
                </p>
                <button 
                  onClick={() => setScenarioStep(1)}
                  className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all"
                >
                  Chấp nhận thử thách!
                </button>
              </div>
            ) : scenarioStep === 1 ? (
              <div className="space-y-4">
                <div className="bg-emerald-50 p-6 rounded-2xl border-2 border-emerald-100">
                  <p className="text-sm text-emerald-600 mb-2 font-bold uppercase tracking-wider">Thử thách Rewrite:</p>
                  <p className="text-emerald-900 font-medium mb-4">Viết lại câu sau dùng "Unless":</p>
                  <p className="text-emerald-700 italic mb-4">"If it doesn't rain, we will go to the marsh."</p>
                  <input 
                    type="text"
                    value={scenarioAnswer}
                    onChange={(e) => {
                      setScenarioAnswer(e.target.value);
                      setScenarioFeedback('');
                    }}
                    placeholder="Nhập câu trả lời của bạn..."
                    className="w-full p-4 rounded-xl border-2 border-emerald-200 focus:border-emerald-500 focus:ring-0 transition-all"
                  />
                  {scenarioFeedback && (
                    <p className={cn(
                      "text-sm font-bold mt-2",
                      scenarioFeedback.includes('Chưa chính xác') ? "text-red-500" : "text-emerald-600"
                    )}>
                      {scenarioFeedback}
                    </p>
                  )}
                </div>
                <button 
                  onClick={async () => {
                    const result = await checkAnswer(
                      scenarioAnswer, 
                      ['Unless it rains, we will go to the marsh', 'Unless it rains, we\'ll go to the marsh'],
                      'Rewrite using Unless: If it doesn\'t rain, we will go to the marsh.'
                    );
                    
                    setScenarioFeedback(result.feedback);
                    
                    if (result.isCorrect) {
                      setScenarioStep(2);
                      if (user) {
                        const bonus = result.bonusTadpoles || 0;
                        const updatedUser = { ...user, tadpoles: user.tadpoles + 100 + bonus };
                        setUser(updatedUser);
                        localStorage.setItem('efrog_user', JSON.stringify(updatedUser));
                      }
                    }
                  }}
                  className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all"
                >
                  Kiểm tra kết quả
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-center">
                <div className="text-6xl">🎉</div>
                <p className="text-emerald-800 font-bold text-xl">Cú nhảy thần sầu!</p>
                <p className="text-emerald-600">Bạn đã nhận được 100 Nòng nọc thưởng thêm. Bây giờ hãy đi mua sắm thôi!</p>
                <button 
                  onClick={() => {
                    setShowDay5Scenario(false);
                    if (user) {
                      const updatedUser = { ...user, hasSeenDay5Scenario: true };
                      setUser(updatedUser);
                      localStorage.setItem('efrog_user', JSON.stringify(updatedUser));
                    }
                    setCurrentView('store');
                  }}
                  className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all"
                >
                  Đến Cửa Hàng Đầm Lầy
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    );
  };

  const renderFrogTutor = () => {
    const viewsWithTutor = ['placement-test', 'warmup', 'quiz', 'matching-quiz'];
    if (!viewsWithTutor.includes(currentView)) return null;

    return (
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
        <AnimatePresence>
          {isTutorOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="bg-white w-80 max-h-[450px] rounded-[32px] shadow-2xl border-2 border-emerald-100 flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="bg-emerald-600 p-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <FrogMascot className="w-8 h-8" level="Tiến sĩ" />
                  <span className="font-black text-sm uppercase tracking-wider">Ếch Gia Sư</span>
                </div>
                <button onClick={() => setIsTutorOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                  <X size={18} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-emerald-50/30 min-h-[200px]">
                {tutorMessages.length === 0 && (
                  <div className="text-center py-8 space-y-2">
                    <p className="text-emerald-600 text-sm italic">"Bạn cần ta gợi ý gì không? Quác!"</p>
                  </div>
                )}
                {tutorMessages.map((msg, i) => (
                  <div key={i} className={cn(
                    "flex",
                    msg.role === 'user' ? "justify-end" : "justify-start"
                  )}>
                    <div className={cn(
                      "max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                      msg.role === 'user' 
                        ? "bg-emerald-600 text-white rounded-tr-none" 
                        : "bg-white text-emerald-900 rounded-tl-none border border-emerald-100"
                    )}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isTutorThinking && (
                  <div className="flex justify-start">
                    <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-emerald-100 shadow-sm flex gap-1">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 bg-white border-t border-emerald-50">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    const input = e.currentTarget.elements.namedItem('tutorInput') as HTMLInputElement;
                    if (input.value.trim()) {
                      askFrogTutor(input.value.trim());
                      input.value = '';
                    }
                  }}
                  className="flex gap-2"
                >
                  <input 
                    name="tutorInput"
                    type="text"
                    placeholder="Hỏi Ếch Gia Sư..."
                    className="flex-1 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-2 text-sm outline-none focus:border-emerald-500 transition-all"
                  />
                  <button type="submit" className="bg-emerald-600 text-white p-2 rounded-xl hover:bg-emerald-700 transition-all">
                    <Send size={18} />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setIsTutorOpen(!isTutorOpen);
            setLastInteractionTime(Date.now());
          }}
          className={cn(
            "w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all border-2",
            isTutorOpen ? "bg-white border-emerald-500 text-emerald-600" : "bg-emerald-600 border-emerald-400 text-white"
          )}
        >
          {isTutorOpen ? <X /> : <MessageSquare />}
          {!isTutorOpen && tutorMessages.length === 0 && viewsWithTutor.includes(currentView) && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
          )}
        </motion.button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f0fdf4] font-sans text-emerald-900">
      {renderFrogTutor()}
      {/* Navigation */}
      {user && (
        <nav className="bg-white border-b border-emerald-100 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setCurrentView('home')}
            >
              <div className="bg-emerald-500 p-1.5 rounded-lg">
                <FrogMascot className="w-6 h-6" level={user?.level} />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-emerald-600 tracking-tighter leading-none">EFROG</span>
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Jump into English</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-6 font-bold text-emerald-700">
              <button onClick={() => setCurrentView('home')} className="hover:text-emerald-500 transition-colors">Trang chủ</button>
              <button onClick={() => setCurrentView('lessons')} className="hover:text-emerald-500 transition-colors">Bài học</button>
              <button onClick={() => setCurrentView('entertainment-hub')} className="hover:text-emerald-500 transition-colors">Giải trí</button>
              <button onClick={() => setCurrentView('notebook')} className="hover:text-emerald-500 transition-colors flex items-center gap-1">
                Sổ tay {user.notebook?.length > 0 && <span className="w-2 h-2 bg-red-500 rounded-full"></span>}
              </button>
              <button onClick={() => setCurrentView('store')} className="hover:text-emerald-500 transition-colors">Cửa hàng</button>
              
              <div className="flex items-center gap-4 pl-4 border-l border-emerald-100">
                <div className="flex items-center gap-1.5 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                  <Flame className="text-orange-500" size={16} />
                  <span className="text-sm font-bold text-orange-700">{user.streak}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100">
                  <Coins className="text-yellow-600" size={16} />
                  <span className="text-sm font-bold text-yellow-700">{user.tadpoles}</span>
                </div>
                <button onClick={() => handleLogout()} className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors">
                  <LogOut size={18} /> Đăng xuất
                </button>
              </div>
            </div>

            <button 
              className="md:hidden p-2 text-emerald-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-white border-t border-emerald-50 overflow-hidden"
              >
                <div className="flex flex-col p-4 gap-4 font-bold text-emerald-700">
                  <button onClick={() => { setCurrentView('home'); setIsMenuOpen(false); }}>Trang chủ</button>
                  <button onClick={() => { setCurrentView('lessons'); setIsMenuOpen(false); }}>Bài học</button>
                  <button onClick={() => { setCurrentView('entertainment-hub'); setIsMenuOpen(false); }}>Giải trí</button>
                  <button onClick={() => { setCurrentView('notebook'); setIsMenuOpen(false); }}>Sổ tay ({user.notebook?.length || 0})</button>
                  <button onClick={() => { setCurrentView('store'); setIsMenuOpen(false); }}>Cửa hàng</button>
                  
                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <Flame className="text-orange-500" size={18} />
                        <span className="font-bold text-orange-700">{user.streak}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Coins className="text-yellow-600" size={18} />
                        <span className="font-bold text-yellow-700">{user.tadpoles}</span>
                      </div>
                    </div>
                    <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="text-red-500">Đăng xuất</button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      )}

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentView === 'onboarding' && renderOnboarding()}
            {currentView === 'placement-test' && renderPlacementTest()}
            {currentView === 'vocabulary-lookup' && renderVocabularyLookup()}
            {currentView === 'entertainment-hub' && renderEntertainmentHub()}
            {currentView === 'smart-translator' && renderSmartTranslator()}
            {currentView === 'notebook' && renderNotebook()}
            {currentView === 'store' && renderStore()}
            {currentView === 'matching-quiz' && renderMatchingQuiz()}
            {currentView === 'home' && renderHome()}
            {currentView === 'lessons' && renderLessons()}
            {currentView === 'lesson-detail' && renderLessonDetail()}
            {currentView === 'warmup' && renderWarmup()}
            {currentView === 'quiz' && renderQuiz()}
            {currentView === 'quiz-result' && renderQuizResult()}
          </motion.div>
        </AnimatePresence>
      </main>

      {renderDay5Scenario()}

      {/* Streak Notifications (Simulated logic for demo) */}
      {user && user.streak > 0 && currentView === 'home' && (
        <div className="fixed bottom-8 right-8 max-w-xs bg-white p-6 rounded-3xl shadow-2xl border-2 border-emerald-100 z-40">
          <div className="flex items-start gap-4">
            <div className="text-3xl">🌿</div>
            <div className="space-y-2">
              <p className="text-sm font-bold text-emerald-900">Lá Sen Tri Thức</p>
              <p className="text-xs text-emerald-600 leading-relaxed italic">
                {user.streak >= 7 
                  ? "Tuyệt vời! Đầm sen của bạn đang xanh mướt rực rỡ! 🐸✨" 
                  : user.streak === 5 
                    ? "Cú nhảy thần sầu! Bạn đã thắp sáng thêm một Lá Sen Tri Thức. Đầm sen xanh mướt đang vẫy gọi! 🌿✨"
                    : `Bạn đã thắp sáng được ${user.streak} Lá sen. Cố lên nhé!`}
              </p>
              {user.streak === 5 && (
                <button 
                  onClick={() => setShowDay5Scenario(true)}
                  className="text-[10px] bg-emerald-600 text-white px-2 py-1 rounded-md font-bold mt-2"
                >
                  Xem phần thưởng ngày 5
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 text-center text-emerald-400 font-medium">
        <p>© 2026 Efrog - Jump into English. 🐸</p>
      </footer>
    </div>
  );
}
