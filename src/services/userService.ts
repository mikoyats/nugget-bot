import { GoogleSpreadsheet } from 'google-spreadsheet';
import { SheetNames } from '../constants/sheets';
import type { Guest } from '../types/Guest';
import type { Member } from '../types/Member';

const {
    USER_GOOGLE_SPREADSHEET_ID,
    GOOGLE_SERVICE_ACCOUNT_EMAIL,
    GOOGLE_SERVICE_ACCOUNT_KEY,
} = process.env as Record<string, string>;

const doc = new GoogleSpreadsheet(USER_GOOGLE_SPREADSHEET_ID);

await doc.useServiceAccountAuth({
    client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: GOOGLE_SERVICE_ACCOUNT_KEY,
});

await doc.loadInfo();

const addMember = async (discordId: string, memberData: Member) => {
    const sheet = doc.sheetsByTitle[SheetNames.MEMBER_LIST];

    const row = await sheet.addRow([
        discordId,
        memberData.name,
        memberData.source,
        memberData.timezone,
        memberData.interests,
        memberData.introduction,
    ]);

    return row;
};

const addGuest = async (discordId: string, guestData: Guest) => {
    const sheet = doc.sheetsByTitle[SheetNames.GUEST_LIST];

    const row = await sheet.addRow([discordId, guestData.referrer]);

    return row;
};

export { addMember, addGuest };
