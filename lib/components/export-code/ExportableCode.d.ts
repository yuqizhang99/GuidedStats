export declare const SD_OUTLIERS: (df_name: string, col_name: string, isIndex: boolean) => string;
export declare const IQR_OUTLIERS: (df_name: string, col_name: string, isIndex: boolean) => string;
export declare const DUPLICATES: (df_name: string, col_name: string, isIndex: boolean) => string;
export declare const QUANT_CHART: (df_name: string, col_name: string, numbins?: number, isIndex?: boolean) => string;
export declare const CAT_CHART: (df_name: string, col_name: string, k?: number, isIndex?: boolean) => string;
export declare const TEMPORAL_CHART: (df_name: string, col_name: string, shouldDisableMaxRows?: boolean, isIndex?: boolean) => string;
export declare type CODE_EXPORT_TYPE = "min" | "25%" | "median" | "mean" | "75%" | "max";
export declare function exportCodeSelection(df_name: string, col_name: string, type: CODE_EXPORT_TYPE, isIndex?: boolean): string;
export declare function exportQuantBin(df_name: string, col_name: string, leftbin: number, rightbin: number, includeleft?: boolean): string;
export declare function exportCatValue(df_name: string, col_name: string, value: string): string;
