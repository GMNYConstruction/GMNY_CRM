export interface CommentType {
  id: number,
  caseid: number,
  comment: string,
  userid: number,
  dateCreated: string,
  user?: UsersType
}

export interface UsersType{ 
  id: number,
  name: string,
  email: string,
  accessLvl: string,
}

export interface Accidents {
  id: number | undefined;
  name: string | undefined;
  report: string | undefined;
  efroi: string | undefined;
  witness: string | undefined;
  correspondence: string | undefined;
  notice: string | undefined;
  accidentDescription: string | undefined;
  accidentLocation: string | undefined;
  backToWork: string | undefined;
  dateOfAccident: string | undefined;
  documentFolder: string | undefined;
  firstCheck: string | undefined;
  lastCheck: string | undefined;
  lastDayOfWork: string | undefined;
  companyWeWorkedFor: string | undefined;
  assignedToCompany: string | undefined;
  comments?: CommentType[]
}

export interface AccidentCardInterface {
  data: {
    id: number;
    name: string;
    assignedToCompany: string;
    companyWeWorkedFor: string;
    dateOfAccident: string;
    documentFolder: string;
    accidentDescription: string;
    [key: string]: string | number;
  };
}

export interface AdminCreate {
    name: string;
    email: string;
    password: string,
    confirmPassword: string;
    accessLvl: string;
}

export interface AuthUser {
  name: string,
  id: number,
  accessLvl: 'admin' | 'moderator',
  email: string,
}