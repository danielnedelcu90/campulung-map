//https://dev.to/calvinpak/how-to-read-write-google-sheets-with-react-193l

import { GoogleSpreadsheet } from "google-spreadsheet";
// Config variables
const SPREADSHEET_ID = '1acCkFu2wPWlHggXAx8PeC1gzaIsYpOav1muIYToJsBY';
const ENTRIES_SHEET_ID = '254267882';
const CATEGORIES_SHEET_ID = '331731962';
const CLIENT_EMAIL = 'campulung-map@core-rite-263013.iam.gserviceaccount.com';
const PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCfGouW36CeUHbQ\nuK7jlzXp5MXhvQLujJ9W0SDwCna9F//38Zt0p0E0s1fvUYGdghR4nQ1uSLA9A0QP\nXrZTGILbHP7ACCXkanNZJm4/7Dou0bNwipNGvp4X4IpyMR+RN/9ibev6+UuKywGp\n4r4rO0SbxM21k8d94mGct/rLfNBMeMHTSR9tNHOxOXLOjWGMsyxaMIJuhjn9jyDv\n7P2fUaynIYYiMfLbxQi6ILyK9oiF3o2hVRbVhFZcGXSJyfQqooJ/fi49FdmAkBJ8\nTBESVjqJQy+VyDxFcDRPDPrVbCOqUKOhdHL+L/uAspsB2Q1sVNtg6QBIcKaLSSig\nZPVwTBirAgMBAAECggEAJZCda6JiKG7kFrS8KiUuCArJQ9qeIheWmWdoCPTXgx7z\nAyYK57iDtz8u4GTUnw0y6yVdoe/MmKM4Qw7AKo9refN3HHzwAWW21VIzDqmmNR6y\n6Lv3OOlRp16PIZYCl4VqqWE9qbSJhvwWaPeNoeRs9wA494msPMch9+AieT//aEZt\nY0U7wCppzvDXGglpnKzSUajT1yjuLh1Sbil6H24Cu2RPOWy5TnEyYUU4Pg/qHJxT\nxGP8bF3LYOzdbyB1h7HpAQiZWjLsk9euCl+L/HjvH8qf4kn/MKW41oytRnqr9k67\nRk29cNqBXjiC6GxnrYnr97wvN+040IrIeIwFjnHPcQKBgQDLRbNrn/ILX9gCM5k+\nhQ1pJTKcySWi2dmKEQfxZzL++AG1n6MUObD4l2zcuSIDpB1ev16XI5JHsEY6ZPO0\nI1XQsk55s+ccvPtShl8D/LXt/AO3G+41wZIdzF872AcdBg2AdFdRdyUONNu+LPwh\nBsrlC3e63eZC66IDJiRfk7a+EQKBgQDIX9RF4eM4OccOEZwms4dN6mpYf17MR4co\nHUbnOjofemm/4yMP+3v9XdBuA6SNzqFajEzMLJGy1nj6y6O0TvI31kaaxXMFFV9U\nciX1PEI50/if4MBqQC+PpwbKfm8FDcEnpIO8QfIhp9QICc7mfcABJJeyQpH8wR7i\n6fXWBX3e+wKBgCnKoMLF1ZulDuIU/bKu5Dzz2t4FNOmwZFtQeROWphNppeBTe9HS\nsqHJcCZJIcch3K/4JFhqhc6bXTTwQHKOuTv5DM1UwXVVHU6wNaS6NiVBpPnmkikX\nLRVXSVUiawP6lJgOU016c3HiSDNnSEb6AIjqvKj8qjSkAWEoXF4SHoYhAoGAVRT7\n2cCU7ub5suufVn+c0GTdSz6qTiuBJHNqC/0ZeQxNowEbfknW2DrhqhU55kz7DqvM\nYFX8d+fB7xxRItry1urRiB6XPG1a0Uy2+W7g4BU12Q1iJruidmkB5THSil7Qybh9\nh46o9cmBqvgfNpfm05VqJHNH8f8+0jNuA7bJP8kCgYAF4WWEbi6NUPIG8qfEMVj9\nEZcrpyupUrcWBu/WdFXwRe2Ey4YnMS5+dHws3M29kCJ9SVcHbcT13atqb8ur0v4R\nP2CQyvRjDd/zSbNPfBcWteEqHfPiXGtwp7Ov0KJlrMk5MMGUK8vpX1s3d2giaiET\n3IBZ4vnEFck0iaOC/kkukw==\n-----END PRIVATE KEY-----\n';


export const saveData = (entry) => {
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

    const {active, id, title, category, img, lat, lng, description } = entry;
    
    const appendSpreadsheet = async (row) => {
      try {
        await doc.useServiceAccountAuth({
          client_email: CLIENT_EMAIL,
          private_key: PRIVATE_KEY,
        });
        // loads document properties and worksheets
        await doc.loadInfo();
    
        const sheet = doc.sheetsById[ENTRIES_SHEET_ID];
        console.log(sheet)
        const result = await sheet.addRow(row);
      } catch (e) {
        console.error('Error: ', e);
      }
    };
    
    const newRow = { 
        active,
        id,
        title,
        category,
        img,
        lat,
        lng,
        description
    };
    
    appendSpreadsheet(newRow);
}

export const loadData = (targetSheet) => {
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

    const readSpreadsheet = async () => {
        try {
          await doc.useServiceAccountAuth({
            client_email: CLIENT_EMAIL,
            private_key: PRIVATE_KEY,
          });
          // loads document properties and worksheets
          await doc.loadInfo();
      
          const sheet = targetSheet == 'entries' ? doc.sheetsById[ENTRIES_SHEET_ID] : doc.sheetsById[CATEGORIES_SHEET_ID];
          return await sheet.getRows();

        } catch (e) {
          console.error('Error: ', e);
        }
      };

    return readSpreadsheet();
}