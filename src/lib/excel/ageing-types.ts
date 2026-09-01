export interface AgeingResult {
  headers: string[];
  rows: Array<Array<string | number>>;
  stats: {
    originalRows: number;
    datedRows: number;
    invalidDates: number;
  };
}

export const AGEING_EXPORT_FILENAME = "Excelify_Ageing.xlsx";
