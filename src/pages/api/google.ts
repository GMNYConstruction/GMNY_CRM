import { google } from "googleapis"

const SCOPE = ['https://www.googleapis.com/auth/drive'];

export async function authorize(){
    const jwtClient = new google.auth.JWT(
        process.env.CLIENT_EMAIL,
        null as any,
        process.env.PRIVATE_KEY,
        SCOPE
    );
    await jwtClient.authorize();
    return jwtClient;
}

export async function getGoogleDrive() {
    const authClient = await authorize();
    return google.drive({ version: 'v3', auth: authClient });
}

 