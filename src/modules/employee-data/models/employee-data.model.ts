import { ApiProperty } from "@nestjs/swagger";

export class EmployeeData {

    @ApiProperty({required: false})
    id?: number;
   
    @ApiProperty()
    worker_id?: number;

    @ApiProperty()
    worker_name?: string;

    @ApiProperty()
    salary_day?: number;

    @ApiProperty()
    salary_night?: number;

    @ApiProperty()
    bet?: string;

   
}