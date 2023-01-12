import { DocumentNode } from 'apollo-link';

export type TBuildQuery = (literals: string | readonly string[], ...args: any[]) => DocumentNode;
