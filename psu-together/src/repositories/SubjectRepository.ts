import axios from 'axios';
import { IRepository } from "./IRepositories";
import Subject from '../models/Subject';

export class SubjectRepository implements IRepository<Subject> {
  async getAll(api : string): Promise<Subject[] | null> {
    return axios.get(api, {
      headers: {
        credential: `api_key=${import.meta.env.VITE_API_KEY}`,
      }
    })
      .then(response => response.data.data[0])
      .catch(error => {
        console.error('Error fetching data:', error);
        return null;
      });
  }

  async getById(api : string): Promise<Subject[] | null> {
    return axios.get(api, {
        headers: {
            credential: `api_key=${import.meta.env.VITE_API_KEY}`,
            token: import.meta.env.VITE_ACCESS_TOKEN
          }
    })
      .then(response => response.data.data)
      .catch(error => {
        console.error('Error fetching data:', error);
        return null;
      });
  }
}