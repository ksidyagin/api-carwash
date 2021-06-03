import { ApiProperty } from "@nestjs/swagger";
import { Carwash } from "src/modules/carwash/models/carwash.interface";
import { User } from "../../user/models/user.interface";

export class UserToCarwash {
    @ApiProperty({required: false})
    userToCarwashId?: number;
    @ApiProperty()
     userId?: number;
    @ApiProperty()
     carwashId?: number;

    //  user?: User;

    //  carwash?: Carwash;
}