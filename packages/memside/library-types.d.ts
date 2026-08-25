export type LibraryImportTarget =
  | "user_ai_profile"
  | "operating_rule"
  | "ai_skill"
  | "memory"
  | "reference"
  | "example"
  | "reusable_template";

export type LibraryLicense = "NONE" | "CC-BY-4.0" | "CC0-1.0";

export type LibraryWorkflowAction =
  | "create"
  | "submit"
  | "retry_review"
  | "publish"
  | "unpublish"
  | "republish";

export interface LibraryTemplateSearchParams {
  query?: string;
  limit?: number;
  category?: string;
  tag?: string;
}

export interface LibraryTemplateReadInput {
  file_paths?: string[];
  max_total_chars?: number;
}

export interface LibraryDraftFile {
  path: string;
  content: string;
  target: LibraryImportTarget;
  item_key?: string;
  skill_variant?: "full" | "optimized";
}

export interface LibraryDraftFolder {
  path: string;
  purpose: LibraryImportTarget;
  description?: string;
}

export interface LibraryDraftWriteInput {
  expected_fingerprint: string;
  idempotency_key: string;
  files: LibraryDraftFile[];
  folders?: LibraryDraftFolder[];
}

export interface LibraryWorkflowInput {
  action: LibraryWorkflowAction;
  idempotency_key: string;
  template_id?: string;
  expected_fingerprint?: string;
  slug?: string;
  name?: string;
  summary?: string;
  category_slug?: string;
  tag_slugs?: string[];
  tag_names?: string[];
  license_id?: LibraryLicense;
  release_notes?: string;
  ownership_confirmed?: boolean;
  public_data_confirmed?: boolean;
}

export type LibraryAutomationResponse = Record<string, unknown>;
