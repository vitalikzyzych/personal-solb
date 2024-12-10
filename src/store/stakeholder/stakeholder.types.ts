export interface IStakeholder {
  id: string;
  affiliation: string;
  approvedRating: number;
  mergingOf: string[];
  occurredIn: string[];
  rating: number;
  status?: string;
  stakeholderName: string;
  stakeholderType: string;
  updatedDate: string;
}

export interface IStakeholderListResponse {
  content: IStakeholder[];
  totalElements: number;
  pageNumber: number;
}

export interface IStakeholderListAllResponse {
  content: { status: string; data: IStakeholder[] }[];
  totalElements: number;
  pageNumber: number;
}

export interface IStakeholderListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
}

export interface IStakeholderIdentity {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  profileType?: string;
  affiliation?: string;
  stakeholderType?: string;
  country?: string;
  city?: string;
  street?: string;
  zip?: string;
  hairColor?: string;
  politicalParty?: string;
}
export interface IStakeholderDocument {
  id: string;
  name?: string;
  updatedDate?: string;
  privacyStatus?: string;
  format?: string;
  category?: string;
  addedBy?: string;
}

export interface IStakeholderTranscript {
  id: string;
  name?: string;
  updatedDate?: string;
  type?: string;
}

export interface IStakeholderPolling {
  id: string;
  name?: string;
  updatedDate?: string;
  mediator?: string;
}

export interface IStakeholderMergingOf {
  id: string;
  stakeholderName: string;
  mergingOf: string[];
  occurredIn: string[];
  approvedRating: number;
  rating: number;
}
