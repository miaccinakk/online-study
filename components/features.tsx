import { MessageCircle, Users, Video, CalendarClock, Award, Globe } from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "Conversation First",
    description:
      "You start speaking from your very first lesson. Our teachers focus on real conversations, not endless grammar drills, so you build confidence fast.",
  },
  {
    icon: Globe,
    title: "Native Teachers",
    description:
      "Learn from friendly, experienced native speakers who know how to make a new language feel natural, clear, and fun to practice.",
  },
  {
    icon: Users,
    title: "Small Groups",
    description:
      "Classes stay small so everyone gets plenty of speaking time and personal attention. Learn together with students at your level.",
  },
  {
    icon: Video,
    title: "Live Online Lessons",
    description:
      "Join interactive lessons from anywhere. All you need is an internet connection to learn with your teacher and classmates in real time.",
  },
  {
    icon: CalendarClock,
    title: "Flexible Schedule",
    description:
      "Pick times that fit your life and learn at your own pace. Reschedule when you need to and never miss the material.",
  },
  {
    icon: Award,
    title: "Track Your Progress",
    description:
      "Follow a clear path with progress tracking and certificates, so you always know how far you've come and what's next.",
  },
];

export function Features() {
  return (
    <section className="relative py-24 sm:py-32" aria-labelledby="features-heading">
      {/* Seamless continuation of grid from hero */}
      <div className="absolute inset-0 isometric-grid opacity-30" />
      
      {/* Very subtle gradient for depth - seamless top transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background/50" />
      
      {/* Subtle large typographic background element */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-bold tracking-tighter opacity-[0.015] whitespace-nowrap"
          style={{ fontFamily: 'system-ui, sans-serif' }}
        >
          LINGUA
        </div>
      </div>
      
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header with SEO-optimized content */}
        <div className="text-left">
          <h2 id="features-heading" className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-foreground">Why Learn with </span>
            <span className="gradient-text">LinguaHub</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            We make learning a new language simple and enjoyable. Live lessons,
            native teachers, and a focus on real conversation help you make
            progress you can actually feel.
          </p>
        </div>

        {/* Features grid with proper line dividers */}
        <div className="relative mt-20">
          {/* Grid container - 3 columns with proper borders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-border/20 rounded-xl overflow-hidden">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              // Row and column calculation for 6 items in 3 columns
              const row = Math.floor(index / 3);
              const col = index % 3;
              const isLastRow = row === 1; // Only 2 rows (0 and 1)
              const isLastCol = col === 2;
              
              // For small screens (2 columns)
              const smRow = Math.floor(index / 2);
              const smCol = index % 2;
              const smIsLastRow = smRow === 2; // 3 rows for 2 columns
              const smIsLastCol = smCol === 1;
              
              return (
                <div
                  key={feature.title}
                  className={`
                    relative p-8 lg:p-10 group transition-colors duration-300 hover:bg-card/50
                    ${!isLastRow ? 'lg:border-b lg:border-border/20' : ''}
                    ${!isLastCol ? 'lg:border-r lg:border-border/20' : ''}
                    ${!smIsLastRow ? 'sm:border-b sm:border-border/20 lg:border-b-0' : ''}
                    ${!smIsLastCol ? 'sm:border-r sm:border-border/20 lg:border-r-0' : ''}
                    ${index < features.length - 1 ? 'border-b border-border/20 sm:border-b-0' : ''}
                    ${!isLastRow ? 'lg:border-b lg:border-border/20' : ''}
                    ${!isLastCol ? 'lg:border-r lg:border-border/20' : ''}
                  `}
                >
                  {/* Feature number - subtle */}
                  <div className="absolute top-6 right-6 text-5xl font-bold text-muted/15 select-none lg:top-8 lg:right-8" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  
                  <div className="relative">
                    {/* Icon */}
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-foreground pr-12">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Decorative corner accents */}
          <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-primary/20 rounded-tl" aria-hidden="true" />
          <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-primary/20 rounded-tr" aria-hidden="true" />
          <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-2 border-b-2 border-primary/20 rounded-bl" aria-hidden="true" />
          <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-primary/20 rounded-br" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
