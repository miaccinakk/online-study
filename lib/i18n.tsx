"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

export type Locale = "en" | "ru";

export const translations = {
  en: {
    // Header
    "nav.home": "Home",
    "nav.courses": "Courses",
    "nav.pricing": "Pricing",
    "nav.about": "About",
    "nav.signIn": "Sign In",
    "nav.getStarted": "Get Started",
    "nav.dashboard": "Dashboard",
    "nav.subscription": "Subscription",
    "nav.support": "Support",
    "nav.signOut": "Sign Out",
    "lang.label": "Language",
    "lang.english": "English",
    "lang.russian": "Русский",

    // Hero
    "hero.title": "Learn a new language with real teachers",
    "hero.subtitle": "Live, conversation-first lessons that get you speaking from day one.",
    "hero.getStartedFree": "Get Started Free",
    "hero.exploreCourses": "Explore Courses",
    "hero.chip.lessonsTitle": "12 lessons",
    "hero.chip.lessonsSub": "completed",
    "hero.chip.levelTitle": "B1 level",
    "hero.chip.levelSub": "speaking",
    "hero.chip.streakTitle": "7-day",
    "hero.chip.streakSub": "learning streak",
    "hero.chip.ratingTitle": "4.9 / 5",
    "hero.chip.ratingSub": "student rating",
    "hero.chip.xpTitle": "+250 XP",
    "hero.chip.xpSub": "bonus earned",
    "hero.chip.langTitle": "4 languages",
    "hero.chip.langSub": "available",

    // Features
    "features.badge": "Why LinguaHub",
    "features.title": "Learning a language, made warm and simple",
    "features.subtitle":
      "Live lessons, expert teachers, and a focus on real conversation help you make progress you can actually feel — without the pressure.",
    "features.conversation.title": "Conversation First",
    "features.conversation.desc":
      "You start speaking from your very first lesson. Our teachers focus on real conversations, not endless grammar drills, so you build confidence fast.",
    "features.teachers.title": "Expert Teachers",
    "features.teachers.desc":
      "Learn from friendly, experienced teachers who know how to make a new language feel natural, clear, and fun to practice.",
    "features.groups.title": "Small Groups",
    "features.groups.desc":
      "Classes stay small so everyone gets plenty of speaking time and personal attention. Learn together with students at your level.",
    "features.live.title": "Live Online Lessons",
    "features.live.desc":
      "Join interactive lessons from anywhere. All you need is an internet connection to learn with your teacher and classmates in real time.",
    "features.flexible.title": "Flexible Schedule",
    "features.flexible.desc":
      "Pick times that fit your life and learn at your own pace. Reschedule when you need to and never miss the material.",
    "features.progress.title": "Track Your Progress",
    "features.progress.desc":
      "Follow a clear path with progress tracking and certificates, so you always know how far you've come and what's next.",

    // Teacher / How it works section
    "teacher.titleA": "Meet your ",
    "teacher.titleB": "teacher",
    "teacher.subtitle":
      "Every LinguaHub course is built and taught by an experienced teacher who cares about your progress.",
    "teacher.name": "Emma Laurent",
    "teacher.role": "Lead teacher & head of curriculum at LinguaHub",
    "teacher.quote":
      "\u201cI built every LinguaHub course around real conversation. You won't memorize endless grammar tables here — you'll be speaking from your very first lesson. My goal is simple: to help you feel confident using your new language in the real world, with people, not just on paper.\u201d",
    "teacher.stat1.value": "8+ years",
    "teacher.stat1.label": "Teaching languages online and in the classroom",
    "teacher.stat2.value": "2,000+",
    "teacher.stat2.label": "Students guided from beginner to confident speaker",
    "teacher.stat3.value": "CELTA · C2",
    "teacher.stat3.label": "Certified teacher with a master's in linguistics",
    "teacher.stat4.value": "4 languages",
    "teacher.stat4.label": "Teaches English, French, Spanish and German",

    // Courses preview
    "coursesPreview.titleA": "Explore Our ",
    "coursesPreview.titleB": "Courses",
    "coursesPreview.subtitle":
      "Live, conversation-first lessons with expert teachers. Pick your language and start speaking from day one.",
    "coursesPreview.viewAll": "View all courses",
    "coursesPreview.viewCourse": "View course",

    // Student stories
    "stories.titleA": "How LinguaHub ",
    "stories.titleB": "changed their lives",
    "stories.subtitle":
      "Real learners, real progress. Hear their stories in their own words.",

    // Footer
    "footer.ctaTitleA": "Ready to ",
    "footer.ctaTitleB": "Start",
    "footer.ctaTitleC": "Learning a Language?",
    "footer.ctaSubtitle":
      "Join thousands of students already learning with LinguaHub. Your first lessons are free.",
    "footer.getStartedFree": "Get Started Free",
    "footer.tagline": "Online language school with live lessons and expert teachers.",
    "footer.product": "Product",
    "footer.company": "Company",
    "footer.legal": "Legal",
    "footer.link.courses": "Courses",
    "footer.link.pricing": "Pricing",
    "footer.link.getStarted": "Get Started",
    "footer.link.aboutUs": "About Us",
    "footer.link.home": "Home",
    "footer.link.about": "About",
    "footer.link.contact": "Contact",
    "footer.link.support": "Support",
    "footer.link.privacy": "Privacy Policy",
    "footer.link.terms": "Terms of Service",
    "footer.link.sitemap": "Site Map",
    "footer.rights": "All rights reserved.",
  },

  ru: {
    // Header
    "nav.home": "Главная",
    "nav.courses": "Курсы",
    "nav.pricing": "Цены",
    "nav.about": "О нас",
    "nav.signIn": "Войти",
    "nav.getStarted": "Начать",
    "nav.dashboard": "Кабинет",
    "nav.subscription": "Подписка",
    "nav.support": "Поддержка",
    "nav.signOut": "Выйти",
    "lang.label": "Язык",
    "lang.english": "English",
    "lang.russian": "Русский",

    // Hero
    "hero.title": "Учите новый язык с настоящими преподавателями",
    "hero.subtitle": "Живые уроки с упором на разговор, где вы начинаете говорить с первого дня.",
    "hero.getStartedFree": "Начать бесплатно",
    "hero.exploreCourses": "Смотреть курсы",
    "hero.chip.lessonsTitle": "12 уроков",
    "hero.chip.lessonsSub": "пройдено",
    "hero.chip.levelTitle": "Уровень B1",
    "hero.chip.levelSub": "разговорный",
    "hero.chip.streakTitle": "7 дней",
    "hero.chip.streakSub": "подряд в учёбе",
    "hero.chip.ratingTitle": "4.9 / 5",
    "hero.chip.ratingSub": "оценка учеников",
    "hero.chip.xpTitle": "+250 XP",
    "hero.chip.xpSub": "получено бонусов",
    "hero.chip.langTitle": "4 языка",
    "hero.chip.langSub": "доступно",

    // Features
    "features.badge": "Почему LinguaHub",
    "features.title": "Изучение языка — тепло и просто",
    "features.subtitle":
      "Живые уроки, опытные преподаватели и упор на реальный разговор помогают добиться прогресса, который вы действительно почувствуете — без давления.",
    "features.conversation.title": "Сначала разговор",
    "features.conversation.desc":
      "Вы начинаете говорить с самого первого урока. Наши преподаватели делают упор на реальные разговоры, а не на бесконечные упражнения по грамматике, поэтому уверенность приходит быстро.",
    "features.teachers.title": "Опытные преподаватели",
    "features.teachers.desc":
      "Учитесь у дружелюбных опытных преподавателей, которые умеют сделать новый язык естественным, понятным и приятным в практике.",
    "features.groups.title": "Малые группы",
    "features.groups.desc":
      "Группы небольшие, поэтому у каждого достаточно времени говорить и получать личное внимание. Учитесь вместе с учениками своего уровня.",
    "features.live.title": "Живые онлайн-уроки",
    "features.live.desc":
      "Присоединяйтесь к интерактивным урокам из любого места. Всё, что нужно — интернет, чтобы учиться с преподавателем и одногруппниками в реальном времени.",
    "features.flexible.title": "Гибкое расписание",
    "features.flexible.desc":
      "Выбирайте удобное время и учитесь в своём темпе. Переносите занятия при необходимости и никогда не пропускайте материал.",
    "features.progress.title": "Отслеживайте прогресс",
    "features.progress.desc":
      "Следуйте понятному пути с отслеживанием прогресса и сертификатами, чтобы всегда знать, как далеко вы продвинулись и что дальше.",

    // Teacher / How it works section
    "teacher.titleA": "Познакомьтесь с ",
    "teacher.titleB": "преподавателем",
    "teacher.subtitle":
      "Каждый курс LinguaHub создан и ведётся опытным преподавателем, которому важен ваш прогресс.",
    "teacher.name": "Эмма Лоран",
    "teacher.role": "Ведущий преподаватель и руководитель учебной программы LinguaHub",
    "teacher.quote":
      "\u201cЯ построила каждый курс LinguaHub вокруг реального разговора. Здесь вы не будете заучивать бесконечные таблицы грамматики — вы будете говорить с самого первого урока. Моя цель проста: помочь вам уверенно использовать новый язык в реальном мире, с людьми, а не только на бумаге.\u201d",
    "teacher.stat1.value": "8+ лет",
    "teacher.stat1.label": "Преподаёт языки онлайн и в классе",
    "teacher.stat2.value": "2 000+",
    "teacher.stat2.label": "Учеников доведено от новичка до уверенного собеседника",
    "teacher.stat3.value": "CELTA · C2",
    "teacher.stat3.label": "Сертифицированный преподаватель с магистерской степенью по лингвистике",
    "teacher.stat4.value": "4 языка",
    "teacher.stat4.label": "Преподаёт английский, французский, испанский и немецкий",

    // Courses preview
    "coursesPreview.titleA": "Изучите наши ",
    "coursesPreview.titleB": "курсы",
    "coursesPreview.subtitle":
      "Живые уроки с упором на разговор и опытными преподавателями. Выбирайте язык и начинайте говорить с первого дня.",
    "coursesPreview.viewAll": "Все курсы",
    "coursesPreview.viewCourse": "Открыть курс",

    // Student stories
    "stories.titleA": "Как LinguaHub ",
    "stories.titleB": "изменил их жизнь",
    "stories.subtitle":
      "Настоящие ученики, настоящий прогресс. Услышьте их истории от первого лица.",

    // Footer
    "footer.ctaTitleA": "Готовы ",
    "footer.ctaTitleB": "начать",
    "footer.ctaTitleC": "изучение языка?",
    "footer.ctaSubtitle":
      "Присоединяйтесь к тысячам учеников, которые уже учатся с LinguaHub. Первые уроки бесплатны.",
    "footer.getStartedFree": "Начать бесплатно",
    "footer.tagline": "Онлайн-школа языков с живыми уроками и опытными преподавателями.",
    "footer.product": "Продукт",
    "footer.company": "Компания",
    "footer.legal": "Правовая информация",
    "footer.link.courses": "Курсы",
    "footer.link.pricing": "Цены",
    "footer.link.getStarted": "Начать",
    "footer.link.aboutUs": "О нас",
    "footer.link.home": "Главная",
    "footer.link.about": "О нас",
    "footer.link.contact": "Контакты",
    "footer.link.support": "Поддержка",
    "footer.link.privacy": "Политика конфиденциальности",
    "footer.link.terms": "Условия использования",
    "footer.link.sitemap": "Карта сайта",
    "footer.rights": "Все права защищены.",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["en"];

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const STORAGE_KEY = "locale";

export function I18nProvider({ children }: { children: ReactNode }) {
  // Default to English to match the server render and avoid hydration mismatch.
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "ru" || stored === "en") {
      setLocaleState(stored);
      document.documentElement.lang = stored;
    }
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
  }, []);

  const t = useCallback(
    (key: TranslationKey) => {
      return translations[locale][key] ?? translations.en[key] ?? key;
    },
    [locale],
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
