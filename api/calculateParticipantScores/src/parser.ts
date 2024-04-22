import { parse } from "csv-parse/sync";

export const convertToCSVString = async (rawInputData: any) => {
    const bufferData = Buffer.from(rawInputData);
    const realData = bufferData.toString();
    return realData;
}

export const convertToJson = async (rawInputData: any) => {
    const csvString = await convertToCSVString(rawInputData);
    const records = parse(csvString, {
        columns: true,
        skip_empty_lines: true
    });
    return records;
}