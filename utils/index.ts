export const getEtherscanLink = (addr: string): string => {
    return `https://etherscan.io/address/${addr}`;
}
export const formatDateTimeString = (time: Date, isOnlyDate = false) => {
    const year = time.getUTCFullYear();
    const month =
        time.getUTCMonth() + 1 < 10 ? "0" + (time.getUTCMonth() + 1) : time.getUTCMonth() + 1;
    const day = time.getUTCDate() < 10 ? "0" + time.getUTCDate() : time.getUTCDate();
    const hours = time.getUTCHours() < 10 ? "0" + time.getUTCHours() : time.getUTCHours();
    const minutes =
        time.getUTCMinutes() < 10 ? "0" + time.getUTCMinutes() : time.getUTCMinutes();
    const formattedDate = `${day}/${month}/${year}`;

    if (isOnlyDate) {
        return formattedDate;
    }

    return `${hours}:${minutes} UTC ${formattedDate}`;
};
