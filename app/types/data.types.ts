export interface DailyReflection {
  id: string;
  date: string;
  title: string;
  quote: string;
  source: string;
  reflection: string;
}

export interface Loading {
  isLoading: boolean;
  isError: boolean;
}
