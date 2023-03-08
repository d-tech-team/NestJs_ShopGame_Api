import { PartialType } from "@nestjs/mapped-types";
import { create } from "./create.dto";

export class update extends PartialType(create) {
    
}