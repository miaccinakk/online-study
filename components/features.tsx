import { Zap, Cpu, Car, Smartphone, History, Cloud } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Error Scanning",
    description:
      "Scan car errors in seconds with our OBD2 scanner app. Connect via Bluetooth or Wi-Fi and read all fault codes instantly from your vehicle's computer.",
  },
  {
    icon: Cpu,
    title: "AI-Powered Diagnostics",
    description:
      "Our car diagnostic app uses artificial intelligence to analyze error codes and provide clear, actionable recommendations for repairs.",
  },
  {
    icon: Car,
    title: "Universal Compatibility",
    description:
      "Works with all OBD2-compatible vehicles manufactured since 1996. The car fault code reader supports all standard protocols.",
  },
  {
    icon: Smartphone,
    title: "Android Support",
    description:
      "Download the OBD2 scanner for Android. Our vehicle diagnostics app works seamlessly on your smartphone.",
  },
  {
    icon: History,
    title: "Diagnostic History",
    description:
      "Keep track of all your scans with detailed history. Monitor your vehicle's health over time and spot recurring issues early.",
  },
  {
    icon: Cloud,
    title: "Cloud Sync & Backup",
    description:
      "Your diagnostic data is securely stored in the cloud. Access your scan history from any device, anytime.",
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
          AI4CAR
        </div>
      </div>
      
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header with SEO-optimized content */}
        <div className="text-left">
          <h2 id="features-heading" className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-foreground">Why Choose Our </span>
            <span className="gradient-text">Car Diagnostic App</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            AI4Car combines the power of an OBD2 Bluetooth scanner app with intelligent 
            AI analysis. Scan car errors, understand what they mean, and know exactly 
            what to fix.
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
