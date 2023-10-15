import dayjs from "dayjs";

export const formateDateAndTime = (data: string) => {
    const startsOn = dayjs(data)
    const time = startsOn.format("h:mm A")
    const date = startsOn.format("ddd, MMM D, YYYY");
    return { time, date }
}