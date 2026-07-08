import { Quote } from "lucide-react";

interface Story {
  name: string;
  detail: string;
  quote: string;
  video: string;
}

const stories: Story[] = [
  {
    name: "Sofia, 24",
    detail: "Now works with clients in London",
    quote:
      "I started from zero and after four months I was leading calls in English. The live lessons made all the difference.",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    name: "Lucas, 31",
    detail: "Moved to Berlin for a new job",
    quote:
      "The structured German path got me exam-ready faster than I expected. I passed my B2 on the first try.",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    name: "Amara, 19",
    detail: "Travels across Latin America",
    quote:
      "My Spanish teacher was so warm and patient. Within weeks I could actually chat with locals on my trip.",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    name: "Kenji, 27",
    detail: "Reading manga in the original",
    quote:
      "Learning the writing systems felt impossible until LinguaHub. The lessons broke it down step by step.",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  },
];

export function StudentStories() {
  return (
    <section className="relative py-20 sm:py-28" aria-labelledby="stories-heading">
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

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {stories.map((story) => (
            <article
              key={story.name}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="relative aspect-video w-full bg-muted">
                <video
                  className="h-full w-full object-cover"
                  controls
                  preload="none"
                  playsInline
                >
                  <source src={story.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <Quote className="h-6 w-6 text-primary/40" />
                <p className="mt-3 flex-1 text-foreground leading-relaxed">
                  {story.quote}
                </p>
                <div className="mt-4 border-t border-border pt-4">
                  <p className="font-semibold text-foreground">{story.name}</p>
                  <p className="text-sm text-muted-foreground">{story.detail}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
