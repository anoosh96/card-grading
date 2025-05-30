export interface ConditionBreakdown {
  centering: { score: number; comments: string };
  corners: { score: number; comments: string };
  edges: { score: number; comments: string };
  surface: { score: number; comments: string };
}

export interface GradingData {
  card_name: string;
  grading_date: string;
  card_number: string;
  graded_by: string;
  grade: string;
  final_score: string;
  condition_breakdown: ConditionBreakdown;
  overall_justification: string;
  condition_tier: string;
  ai_summary: string;
  frontImage: string;
  backImage: string;
  pdfFile?: Blob | null;
  cardId?: string;
  createdAt?: string;
}