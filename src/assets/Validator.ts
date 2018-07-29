import { Response } from './Enum';

export class Validator {
	private static _instance: Validator;

	private constructor() {}

	public static get getInstance() {
        return this._instance || (this._instance = new this());
	}

	checkSize (val: String, max: number = 999999, min: number = 0): any  {
		let val_length = val.length;

		if(val_length < min) 
			return { response : Response.invalid_min + min, pass: false } 
		else if(val_length > max) 
			return { response: Response.invalid_max + max, pass: false }
		else
			return { response: "", pass: true }  
	}

	isEmpty (val: any): Boolean {
		return (val.trim() && val.length > 0) ? false: true;
	}
}