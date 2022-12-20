// "contrato" para validação dos campos que indepente da lib escolhida, 
// assim o sistema não se torna dependente da lib

export type FieldErrors = {
  [field: string]: string[]
}

export interface ValidatorFieldInterface<PropsValidated> {
  errors: FieldErrors;
  validatedData: PropsValidated;

  validate(data: any): boolean;
}

export default ValidatorFieldInterface;