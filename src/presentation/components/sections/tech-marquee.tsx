const TECHNOLOGIES = [
  "Kotlin",
  "Jetpack Compose",
  "Android SDK",
  "Compose Multiplatform",
  "Flutter",
  "Dart",
  "Clean Architecture",
  "Coroutines & Flow",
  "BLoC",
  "Hilt",
  "MVVM",
  "MVI",
  "Room",
  "Retrofit",
  "Spring Boot",
  "Golang",
  "Docker",
  "Supabase",
] as const;

/** Infinite ticker of the stack, duplicated once for a seamless loop. */
export function TechMarquee() {
  const track = [...TECHNOLOGIES, ...TECHNOLOGIES];

  return (
    <div className="border-y border-line bg-canvas-alt py-5">
      <div className="mask-fade-x overflow-hidden">
        <ul
          aria-hidden
          className="animate-marquee flex w-max items-center gap-10 pr-10"
        >
          {track.map((tech, index) => (
            <li
              key={`${tech}-${index}`}
              className="flex shrink-0 items-center gap-10 font-mono text-sm tracking-tight text-ink-subtle"
            >
              {tech}
              <span className="h-1 w-1 rounded-full bg-accent-line" />
            </li>
          ))}
        </ul>
      </div>
      <span className="sr-only">
        Core technologies: {TECHNOLOGIES.join(", ")}.
      </span>
    </div>
  );
}
