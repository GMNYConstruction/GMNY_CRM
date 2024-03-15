export interface CommentType {
  id: number,
  caseid: number,
  comments: string,
  userid: number,
  dateCreated: string,
}

export interface UsersType{ 
  id: number,
  name: string,
  email: string,
  accessLvl: string,
}

export interface Accidents {
  id: number;
  name: string;
  report: string;
  efroi: string;
  witness: string;
  correspondence: string;
  notice: string;
  accidentDescription: string;
  accidentLocation: string;
  backToWork: string;
  dateOfAccident: string;
  documentFolder: string;
  firstCheck: string;
  lastCheck: string;
  lastDayOfWork: string;
  companyWeWorkedFor: string;
  assignedToCompany: string;
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