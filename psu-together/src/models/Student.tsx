export default interface Student {
    studentId: string;
    titleName: string;
    studNameThai: string;
    studSnameThai: string;
    studNameEng: string;
    studSnameEng: string;
    yearStatus: string;
    nationality: string;
    majorId: string;
    majorNameThai: string;
    deptId: string;
    deptNameThai: string;
    facId: string;
    facNameThai: string;
    campusId: string;
    campusNameThai: string;
    subMajorId: string | null;
    subMajorNameThai: string | null;
    minorId: string | null;
    minorNameThai: string | null;
    studyLevelName: string;
    stillStudent: string;
}
