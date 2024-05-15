export default interface Review {
    id : number;
    std_id: string | undefined;
    rating: number;
    hour: number;
    review: string | null;
}
