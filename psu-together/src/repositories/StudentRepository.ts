import axios from 'axios';
import Student from "../models/Student";
import { IRepository } from "./IRepositories";
import Image from '../models/Image';

export class StudentRepository implements IRepository<Student | Image> {
  async getData(api : string): Promise<Student | null> {
    return axios.get(api, {
      headers: {
        credential: `api_key=${import.meta.env.VITE_API_KEY}`,
        token: localStorage.getItem('access_token')
      }
    })
      .then(response => response.data.data[0])
      .catch(error => {
        console.error('Error fetching data:', error);
        return null;
      });
  }

  async getImage(api : string): Promise<Image | null> {
    return axios.get(api, {
      headers: {
        credential: `api_key=${import.meta.env.VITE_API_KEY}`,
        token: localStorage.getItem('access_token')
      }
    })
      .then(response => response.data.data[0])
      .catch(error => {
        console.error('Error fetching data:', error);
        return null;
      });
  }
}