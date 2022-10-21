interface Votes {
    _id: string;
    publisher: string;
    title: string;
    code: string;
    startDateTime: string;
    endDateTime: string;
    candidates: Candidate[];
    createdAt: string;
}