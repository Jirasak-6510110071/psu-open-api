import React, { createContext, useState, useEffect, ReactNode } from 'react';
import Student from '../models/Student';
import Repo from "../repositories"
import { baseUrl } from '../constant';
import Image from '../models/Image';
import Subject from '../models/Subject';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({
  studentData: undefined as Student | undefined,
  studentSubject : undefined as Subject[] | undefined,
  setStudentData: (data : Student) => {},
  studentImage: undefined as Image | undefined,
  setStudentImage: (data : Image) => {},
  sidebarToggle: false,
  setSidebarToggle: (toggle: boolean) => {}
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [studentData, setStudentData] = useState<Student>();
  const [studentSubject, setStudentSubject] = useState<Subject[]>([]);
  const [studentImage, setStudentImage] = useState<Image>();
  const [sidebarToggle, setSidebarToggle] = useState<boolean>(true)

  const fetchLoggedInStudent = async () => {
    const data = await Repo.Studentdata.getData(`${baseUrl}/level2/StudentDetail/token`)
    const img = await Repo.Studentdata.getImage(`${baseUrl}/level2/StudentImage/token`)
    const subject = await Repo.Subjectdata.getById(`${baseUrl}/level2/RegistData/token?offset=0&limit=40`)
    if (data && img && subject){
      setStudentData(data)
      setStudentImage(img)
      setStudentSubject(subject)
    }
  };

  useEffect(() => {
    fetchLoggedInStudent();
  }, []);

  return (
    <AuthContext.Provider value={{ studentData, setStudentData, studentImage, setStudentImage, sidebarToggle, setSidebarToggle, studentSubject }}>
      {children}
    </AuthContext.Provider>
  );
};
