import { User, UserAttribute } from '../model/Model';

export class AuthService {
    public async login(userName: string, password: string): Promise<User | undefined> {
        if(userName === 'user' && password === '1234') {
            return {
                userName: userName,
                email: "user@gmail.com"
            }
        } else {
            return undefined
        }
    }
    public async getUserAttribute(user: User): Promise<UserAttribute[]> {
        const result: UserAttribute[]= [];
        result.push({
            name: "description",
            value: "Very Frequent User"
        })
        result.push({
            name: "job",
            value: "Enginer"
        })
        result.push({
            name: "age",
            value: "26"
        })
        result.push({
            name: "Experience",
            value: "3"
        })
        return result;
    }
}