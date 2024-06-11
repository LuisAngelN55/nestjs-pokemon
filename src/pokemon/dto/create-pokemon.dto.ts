
import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePokemonDto {

    //isInt, isPositive, min 1
    @IsInt(({ message: 'Value must be an int'}))
    @IsPositive(({ message: 'Must be Positive int'}))
    @Min(1, ({ message: 'Must greather than 0'}))
    no: number;


    // isString, minleth 1
    @IsString(({ message: 'The name must be a string'}))
    @MinLength(1, ({message: 'Min length 1'}))
    name: string;
    
}
