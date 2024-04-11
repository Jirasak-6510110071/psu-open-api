import Student from "../models/Student";
import { IRepository } from "./IRepositories";

const urlLocation = 'https://api-gateway.psu.ac.th/Test/regist/Student/';

const authHeaders = {
    credential: 'api_key=xjaObKMgjqH05HO2djd5RKrvcSiGzjTClgE=',
    'Content-Type': 'application/json'
};

export class StudentRepository implements IRepository<Student> {
    async getAll(): Promise<Student[] | null> {
        const response = await fetch(urlLocation, {
            method: 'GET',
            headers: authHeaders
        });
        const responseData = await response.json();
        return responseData.data;
    }

}