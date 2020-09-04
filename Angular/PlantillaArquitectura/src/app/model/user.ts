export class User {
    UserId: number;
    Names: string;
    Document: string;
    Mail: string;
    Phone: string;
    Active: boolean;
    Address: string;
    Profile: Profile;
    Picture: FileObject;
    Password: string;
    Personalize1: string;
    Personalize2: string;
    UserStamp:string;
    SessionToken:string;
}

export class FileObject {
    FileName: string;
    FileType: string;
    FileData: any;
}

export class Profile {
    ProfileId: string;
    ProfileName: string;
    //Permissions: string;
}
