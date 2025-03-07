import moment from "moment";

export const getDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return moment(date).format("DD-MM.YYYY ,HH:mm")
}