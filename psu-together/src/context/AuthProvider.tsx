// AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import Student from '../models/Student';
import Repo from "../repositories";
import { baseUrl } from '../constant';
import Image from '../models/Image';
import Subject from '../models/Subject';

interface AuthContextProps {
  studentData?: Student;
  studentSubject?: Subject[];
  setStudentData: (data: Student) => void;
  studentImage?: Image;
  setStudentImage: (data: Image) => void;
  sidebarToggle: boolean;
  setSidebarToggle: (toggle: boolean) => void;
  loading: boolean;
  fetchStudentData: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [studentData, setStudentData] = useState<Student | undefined>();
  const [studentSubject, setStudentSubject] = useState<Subject[] | undefined>([]);
  const [studentImage, setStudentImage] = useState<Image | undefined>();
  const [sidebarToggle, setSidebarToggle] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchLoggedInStudent = async () => {
    setLoading(true);
    try {
      const data = await Repo.Studentdata.getData(`${baseUrl}/level2/StudentDetail/token`);
      const img = await Repo.Studentdata.getImage(`${baseUrl}/level2/StudentImage/token`);
      const subject = await Repo.Subjectdata.getById(`${baseUrl}/level2/RegistData/token?offset=0&limit=40`);

      if (data && img && subject) {
        setStudentData(data);
        setStudentImage(img);
        setStudentSubject(subject);
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoggedInStudent();
  }, []);

  return (
    <AuthContext.Provider value={{ studentData, setStudentData, studentImage, setStudentImage, sidebarToggle, setSidebarToggle, studentSubject, loading, fetchStudentData: fetchLoggedInStudent }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
