export interface DocumentSource {
  id: number;
  groupId: number;
  name: string;
  categoryId: number;
  levelId: number;
}

export interface DocumentTitle {
  text: string;
  markup: string;
}

export interface DocumentContent {
  markup: string;
}

export interface DocumentAttributes {
  isTechNews: boolean;
  isAnnouncement: boolean;
  isDigest: boolean;
  influence: number;
  wordCount: number;
  coverage: {
    value: number;
    state: string;
  };
}

export interface Document {
  schemaVersion: string;
  id: string;
  version: number;
  issueDate: string;
  url: string;
  author?: {
    name: string;
  };
  source: DocumentSource;
  dedupClusterId: string;
  title: DocumentTitle;
  content: DocumentContent;
  attributes: DocumentAttributes;
  language: string;
}

export interface DocumentResponse {
  ok?: Document;
  fail?: {
    errorCode: string;
    errorMessage: string;
  };
}