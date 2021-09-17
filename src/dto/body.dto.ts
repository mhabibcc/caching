import { IsString } from "class-validator";

export class BodyDTO {
    @IsString()
    value: string;
}