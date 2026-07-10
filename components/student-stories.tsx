import { ScrollRail } from "@/components/scroll-rail";
import { StoryCard, type Story } from "@/components/story-card";

const stories: Story[] = [
  {
    name: "Sofia",
    course: "English Conversation",
    quote: "I started from zero and after four months I was leading calls in English.",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    name: "Lucas",
    course: "German Exam Prep",
    quote: "The structured German path got me exam-ready and I passed my B2 on the first try.",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    name: "Amara",
    course: "Spanish Conversation",
    quote: "Within weeks I could actually chat with locals on my trip across Latin America.",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    name: "Kenji",
    course: "Japanese for Beginners",
    quote: "The lessons broke the writing systems down step by step until it finally clicked.",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  },
  {
    name: "Marta",
    course: "Business Italian",
    quote: "Now I can negotiate and even joke with my business partners in Italian.",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  },
  {
    name: "Diego",
    course: "Portuguese Conversation",
    quote: "The teachers gave me the confidence to speak from the very first lesson.",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  },
  {
    name: "Yuki",
    course: "Mandarin Chinese",
    quote: "The step-by-step coaching made the tones click, and now I use Chinese every day at work.",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
  },
];

export function StudentStories() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28" aria-labelledby="stories-heading">
      <div className="absolute inset-0 isometric-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 id="stories-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="text-foreground">How LinguaHub </span>
            <span className="gradient-text">changed their lives</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Real learners, real progress. Hear their stories in their own words.
          </p>
        </div>
      </div>

      {/* Full-bleed horizontal scroll rail */}
      <div className="relative mt-12">
        <ScrollRail ariaLabel="Student stories" bleed>
          {stories.map((story) => (
            <StoryCard key={story.name} story={story} />
          ))}
        </ScrollRail>
      </div>
    </section>
  );
}
