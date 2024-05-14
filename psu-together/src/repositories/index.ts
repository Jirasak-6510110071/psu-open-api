import { StudentRepository } from "./StudentRepository";
import { SubjectRepository } from "./SubjectRepository";
const repositories = {
    Studentdata: new StudentRepository(),
    Subjectdata: new SubjectRepository(),
}

export default repositories