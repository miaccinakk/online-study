export type CourseCategory = "conversation" | "business" | "exam";

export interface Course {
  slug: string;
  code: string | null;
  title: string;
  description: string;
  category: CourseCategory;
  image: string;
  content: string;
  learn: string[];
  includes: string[];
  outcomes: string[];
  relatedCodes: string[];
  searchVolume: "high" | "medium" | "low";
}

export const categories: Record<
  CourseCategory,
  { name: string; description: string; icon: string }
> = {
  conversation: {
    name: "Conversational",
    description: "Speak naturally and confidently from your very first lesson",
    icon: "message",
  },
  business: {
    name: "Business & Professional",
    description: "Language skills for work, meetings, and international careers",
    icon: "briefcase",
  },
  exam: {
    name: "Exam Preparation",
    description: "Structured courses to pass official language certifications",
    icon: "graduation",
  },
};

export const courses: Course[] = [
  {
    slug: "english-course",
    code: "EN",
    title: "English: From Beginner to Confident Speaker",
    description:
      "Learn English with experienced teachers. Build vocabulary, master grammar, and start holding real conversations in weeks, not years.",
    category: "business",
    image: "/images/courses/english.png",
    content: `
## About This Course

Our English course is designed for learners who want practical, usable language skills fast. Whether you are starting from zero or brushing up for work, our step-by-step lessons take you from the basics to confident, everyday communication.

## How Lessons Work

Every week you join small live group classes led by experienced teachers, plus interactive exercises you can complete at your own pace. You practice speaking from day one and get personal feedback on your progress.

## Who It's For

This course fits busy professionals, students, and travelers who want to use English in real situations, from job interviews to casual chats with friends abroad.
    `,
    learn: [
      "Everyday vocabulary for real conversations",
      "Clear pronunciation and confident speaking",
      "Grammar explained simply and practically",
      "Listening skills for movies, podcasts, and calls",
      "Writing emails and messages that sound natural",
    ],
    includes: [
      "Live group lessons with expert teachers",
      "Interactive exercises and homework",
      "Personal feedback on your speaking",
      "Downloadable lesson materials",
      "Progress tracking and certificates",
    ],
    outcomes: [
      "Hold everyday conversations with ease",
      "Understand native speakers at natural speed",
      "Write clear, professional emails",
      "Feel confident using English at work",
      "Reach a solid B2 level in months",
    ],
    relatedCodes: ["FR", "ES"],
    searchVolume: "high",
  },
  {
    slug: "french-course",
    code: "FR",
    title: "French: Speak with Style and Confidence",
    description:
      "Discover the beauty of French through immersive, conversation-first lessons. Perfect for travel, culture lovers, and lifelong learners.",
    category: "conversation",
    image: "/images/courses/french.png",
    content: `
## About This Course

Bonjour! Our French course focuses on conversation from the very beginning. You will learn to order coffee in Paris, chat with locals, and understand French culture through the language itself.

## How Lessons Work

Small, friendly classes keep you speaking throughout every session. Teachers gently correct your accent and build your confidence one conversation at a time, supported by fun exercises between lessons.

## Who It's For

Ideal for travelers, culture enthusiasts, and anyone who has always dreamed of speaking French naturally and elegantly.
    `,
    learn: [
      "Practical phrases for travel and daily life",
      "A natural French accent and rhythm",
      "Core grammar without the overwhelm",
      "Cultural context behind the language",
      "Confidence to speak from lesson one",
    ],
    includes: [
      "Conversation-focused live classes",
      "Pronunciation coaching",
      "Cultural insights and real dialogues",
      "Practice exercises and audio",
      "Progress tracking and certificates",
    ],
    outcomes: [
      "Handle everyday situations while traveling",
      "Understand and join casual conversations",
      "Read menus, signs, and simple texts",
      "Speak with a more natural accent",
      "Build a foundation for fluency",
    ],
    relatedCodes: ["ES", "EN"],
    searchVolume: "high",
  },
  {
    slug: "spanish-course",
    code: "ES",
    title: "Spanish: Start Talking from Day One",
    description:
      "Join one of the world's most spoken languages. Our Spanish course gets you speaking quickly with warm, energetic teachers and real-world practice.",
    category: "conversation",
    image: "/images/courses/spanish.png",
    content: `
## About This Course

Spanish opens the door to more than 20 countries and hundreds of millions of speakers. Our course is built around speaking early and often, so you feel progress from your very first week.

## How Lessons Work

Interactive live lessons focus on real dialogues you will actually use. You will practice with classmates and teachers, reinforced by short daily exercises that fit into a busy schedule.

## Who It's For

Great for travelers, professionals expanding into Latin American markets, and anyone who loves the vibrant culture behind the Spanish language.
    `,
    learn: [
      "Essential phrases for travel and daily life",
      "Confident, clear pronunciation",
      "Grammar taught through real examples",
      "Listening skills for native speakers",
      "Vocabulary for work and socializing",
    ],
    includes: [
      "Energetic live group lessons",
      "Real-world dialogue practice",
      "Daily bite-sized exercises",
      "Downloadable study materials",
      "Progress tracking and certificates",
    ],
    outcomes: [
      "Start conversations from week one",
      "Travel comfortably across Spanish-speaking countries",
      "Understand common expressions and slang",
      "Communicate at work with colleagues",
      "Progress steadily toward fluency",
    ],
    relatedCodes: ["FR", "EN"],
    searchVolume: "high",
  },
  {
    slug: "german-course",
    code: "DE",
    title: "German: Structured Learning for Real Results",
    description:
      "Master German step by step with a clear, structured path. Ideal for study, work in Germany, and official exam preparation.",
    category: "exam",
    image: "/images/courses/german.png",
    content: `
## About This Course

German has a reputation for being difficult, but with the right structure it becomes logical and rewarding. Our course guides you through each level with clarity, preparing you for study, work, or official certification.

## How Lessons Work

Lessons follow a proven curriculum aligned with official exam standards. Live classes combine grammar, speaking, and exam techniques, while exercises reinforce every concept between sessions.

## Who It's For

Perfect for students planning to study in Germany, professionals relocating for work, and anyone preparing for Goethe or TestDaF certifications.
    `,
    learn: [
      "A clear roadmap through each level",
      "Grammar structures made logical",
      "Exam strategies and practice tests",
      "Speaking and listening for real situations",
      "Vocabulary for study and work",
    ],
    includes: [
      "Structured live lessons by level",
      "Official-style practice exams",
      "Detailed feedback on writing and speaking",
      "Study materials and vocabulary lists",
      "Progress tracking and certificates",
    ],
    outcomes: [
      "Follow a clear path from A1 to B2",
      "Feel prepared for official exams",
      "Communicate in academic and work settings",
      "Understand German media and texts",
      "Build lasting, structured knowledge",
    ],
    relatedCodes: ["EN", "FR"],
    searchVolume: "medium",
  },
  {
    slug: "italian-course",
    code: "IT",
    title: "Italian: Fall in Love with the Language",
    description:
      "Learn Italian the way it's meant to be spoken - with passion and warmth. Perfect for food lovers, travelers, and anyone drawn to la dolce vita.",
    category: "conversation",
    image: "/images/courses/italian.png",
    content: `
## About This Course

Italian is one of the most musical and expressive languages in the world. Our course helps you speak it naturally, from ordering a proper espresso to chatting with locals in a Tuscan village.

## How Lessons Work

You join lively live classes centered on real conversations, supported by short exercises between sessions. Teachers guide your pronunciation so your Italian sounds authentic from the start.

## Who It's For

Perfect for travelers, food and culture enthusiasts, and romantics who want to experience Italy through its beautiful language.
    `,
    learn: [
      "Everyday phrases for travel and dining",
      "A melodic, natural Italian accent",
      "Grammar taught through real examples",
      "Cultural context behind the language",
      "Confidence to speak from lesson one",
    ],
    includes: [
      "Conversation-first live classes",
      "Pronunciation coaching",
      "Cultural insights and real dialogues",
      "Practice exercises and audio",
      "Progress tracking and certificates",
    ],
    outcomes: [
      "Handle everyday situations while traveling",
      "Join casual conversations with locals",
      "Read menus, signs, and simple texts",
      "Speak with a natural, musical accent",
      "Build a foundation for fluency",
    ],
    relatedCodes: ["ES", "FR"],
    searchVolume: "medium",
  },
  {
    slug: "portuguese-course",
    code: "PT",
    title: "Portuguese: Your Gateway to Two Continents",
    description:
      "Speak the language of Brazil and Portugal. Our friendly, conversation-first course gets you comfortable with real Portuguese quickly.",
    category: "conversation",
    image: "/images/courses/portuguese.png",
    content: `
## About This Course

Portuguese connects you to over 250 million speakers across Brazil, Portugal, and beyond. Our course focuses on speaking early, so you gain confidence fast.

## How Lessons Work

Interactive live lessons keep you talking, with real dialogues you'll actually use. Short daily exercises reinforce each lesson and fit into a busy schedule.

## Who It's For

Great for travelers, professionals working with Brazilian or Portuguese partners, and anyone who loves the rhythm of the language.
    `,
    learn: [
      "Essential phrases for travel and daily life",
      "Clear, confident pronunciation",
      "Grammar taught through real examples",
      "Listening skills for native speakers",
      "Vocabulary for work and socializing",
    ],
    includes: [
      "Energetic live group lessons",
      "Real-world dialogue practice",
      "Daily bite-sized exercises",
      "Downloadable study materials",
      "Progress tracking and certificates",
    ],
    outcomes: [
      "Start conversations from week one",
      "Travel comfortably in Brazil and Portugal",
      "Understand common expressions",
      "Communicate at work with colleagues",
      "Progress steadily toward fluency",
    ],
    relatedCodes: ["ES", "IT"],
    searchVolume: "low",
  },
  {
    slug: "japanese-course",
    code: "JP",
    title: "Japanese: From Hiragana to Real Conversations",
    description:
      "Learn Japanese with a clear, structured path through writing and speaking. Ideal for travel, culture, anime fans, and exam preparation.",
    category: "exam",
    image: "/images/courses/japanese.png",
    content: `
## About This Course

Japanese may look challenging, but with the right structure it becomes an exciting journey. Our course guides you from the writing systems to confident everyday conversation.

## How Lessons Work

Lessons follow a clear curriculum combining writing, speaking, and listening. Live classes are reinforced by structured exercises that build your knowledge step by step.

## Who It's For

Perfect for travelers, culture and anime enthusiasts, and students preparing for the JLPT certification.
    `,
    learn: [
      "Hiragana, katakana, and essential kanji",
      "Everyday phrases for real situations",
      "Grammar structures made logical",
      "Listening skills for native speakers",
      "Exam strategies for the JLPT",
    ],
    includes: [
      "Structured live lessons by level",
      "Writing-system practice",
      "Detailed feedback on speaking",
      "Study materials and vocabulary lists",
      "Progress tracking and certificates",
    ],
    outcomes: [
      "Read and write hiragana and katakana",
      "Hold basic everyday conversations",
      "Feel prepared for the JLPT",
      "Understand common expressions",
      "Build lasting, structured knowledge",
    ],
    relatedCodes: ["DE", "EN"],
    searchVolume: "medium",
  },
  {
    slug: "chinese-course",
    code: "ZH",
    title: "Mandarin Chinese: Speak the World's Biggest Language",
    description:
      "Master Mandarin for business and travel with clear tones, practical vocabulary, and expert teachers who make it approachable.",
    category: "business",
    image: "/images/courses/chinese.png",
    content: `
## About This Course

Mandarin Chinese opens doors to the world's largest market and over a billion speakers. Our course makes tones and characters approachable, focusing on practical, usable language.

## How Lessons Work

Live classes combine speaking, tone practice, and essential characters. Between sessions, short exercises reinforce vocabulary and pronunciation.

## Who It's For

Ideal for professionals expanding into Chinese markets, travelers, and ambitious learners who want a valuable global skill.
    `,
    learn: [
      "The four tones and clear pronunciation",
      "Practical vocabulary for work and travel",
      "Essential characters step by step",
      "Grammar taught through real examples",
      "Listening skills for native speakers",
    ],
    includes: [
      "Structured live group lessons",
      "Tone and pronunciation coaching",
      "Character-writing practice",
      "Downloadable study materials",
      "Progress tracking and certificates",
    ],
    outcomes: [
      "Pronounce the four tones confidently",
      "Handle everyday and business situations",
      "Recognize common characters",
      "Communicate with colleagues and partners",
      "Progress steadily toward fluency",
    ],
    relatedCodes: ["EN", "JP"],
    searchVolume: "medium",
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getCoursesByCategory(category: CourseCategory): Course[] {
  return courses.filter((c) => c.category === category);
}

export function getFeaturedCourses(): Course[] {
  return courses.filter((c) => c.searchVolume === "high");
}

export function searchCourses(query: string): Course[] {
  const lowerQuery = query.toLowerCase();
  return courses.filter(
    (c) =>
      c.code?.toLowerCase().includes(lowerQuery) ||
      c.title.toLowerCase().includes(lowerQuery) ||
      c.description.toLowerCase().includes(lowerQuery),
  );
}

export const COURSES_PER_PAGE = 12;

export function getPaginatedCourses(page: number): {
  courses: Course[];
  totalPages: number;
  totalCount: number;
} {
  const totalCount = courses.length;
  const totalPages = Math.ceil(totalCount / COURSES_PER_PAGE);
  const startIndex = (page - 1) * COURSES_PER_PAGE;
  const paginatedCourses = courses.slice(
    startIndex,
    startIndex + COURSES_PER_PAGE,
  );

  return { courses: paginatedCourses, totalPages, totalCount };
}

export function getAllCourseSlugs(): string[] {
  return courses.map((c) => c.slug);
}
