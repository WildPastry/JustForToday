interface DailyReflections {
  dailyReflection: DailyReflection[];
}

interface DailyReflection {
  date: string;
  title: string;
  quote: string;
  source: string;
  reflection: string;
}
