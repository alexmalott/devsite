// To parse this data:
//
//   import { Convert, Resume } from "./file";
//
//   const resume = Convert.toResume(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export default interface Resume {
  basics:       Basics;
  work:         Volunteer[];
  volunteer:    Volunteer[];
  education:    Education[];
  awards:       Award[];
  certificates: Certificate[];
  skills:       Skill[];
  languages:    Language[];
}

export interface Award {
  title:   string;
  date:    string;
  awarder: string;
  summary: string;
  url:     string;
}

export interface Basics {
  name:     string;
  label:    string;
  email:    string;
  phone:    string;
  url:      string;
  summary:  string;
  location: Location;
  profiles: Profile[];
}

export interface Location {
  city:        string;
  countryCode: string;
  region:      string;
}

export interface Profile {
  network:  string;
  username: string;
  url:      string;
}

export interface Certificate {
  name:   string;
  date:   string;
  issuer: string;
  url:    string;
}

export interface Education {
  institution: string;
  url:         string;
  area:        string;
  studyType:   string;
  startDate:   string;
  endDate:     string;
  courses:     string[];
}

export interface Language {
  language: string;
  fluency:  string;
}

export interface Skill {
  name:     string;
  level?:   string;
  keywords: string[];
}

export interface Volunteer {
  organization?: string;
  position:      string;
  url:           string;
  startDate:     string;
  endDate?:      string;
  summary:       string;
  highlights:    string[];
  name?:         string;
}
