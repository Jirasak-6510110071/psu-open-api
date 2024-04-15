import Student from "../models/Student";
import { IRepository } from "./IRepositories";

const authHeaders = {
    credential: 'api_key=xjaObKMgjqH05HO2djd5RKrvcSiGzjTClgE=',
    'Content-Type': 'application/json'
};

export class StudentRepository implements IRepository<Student> {
    async getAll(): Promise<Student[] | null> {
        const response = await fetch('https://api-gateway.psu.ac.th/Test/regist/Student?campusID=&facID=&majorID=&offset=0&limit=350', {
            method: 'GET',
            headers: authHeaders
        });
        const responseData = await response.json();
        return responseData.data;
    }
    async getByCampusID(campusID: string): Promise<Student[] | null> {
        const response = await fetch(
          `https://api-gateway.psu.ac.th/Test/regist/Student?campusID=${campusID}&facID=&majorID=&offset=0&limit=350`,
          {
            method: 'GET',
            headers: authHeaders
          }
        );
        const responseData = await response.json();
        return responseData.data;
      }

}