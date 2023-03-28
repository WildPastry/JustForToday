interface DailyReflection {
  id: number;
  date: string;
  title: string;
  quote: string;
  source: string;
  reflection: string;
}

interface Loading {
  isLoading: boolean;
  isError: boolean;
}
