export default interface TutorModel {
    id: number;
    std_id: string | undefined;
    std_name: string | undefined;
    location: string;
    time: string;
    date: string;
    image: string | undefined;
    subject: string;
    teachingMode: string;
    duration: number;
    status: string;
}
