export class User {

    UserId: number=0;
    Names: string;
    Document: string;
    Mail: string;
    Login: string;
    Phone: string;
    Active: boolean;
    Address: string;
    Profile: Profile = new Profile();
    Picture: FileObject;
    Password: string;
    Personalize1: any;
    Personalize2: any;
    UserStamp:string;
    SessionToken:string;
    Edition : string;
}

export class FileObject {
    FileName: string;
    FileType: string;
    FileData: any;
}

export class Profile {
    ProfileId: string;
    ProfileName: string;
    Permissions: string[] =[];
}
