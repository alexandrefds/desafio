import vine from '@vinejs/vine'

const userSchema = vine.object({
  name: vine.string().trim().minLength(3).maxLength(45),

  email: vine
    .string()
    .trim()
    .email()
    .maxLength(50)
    .unique(async (db: any, value: string) => {
      const user = await db.from('users').where('email', value).first()
      return !user
    }),

  password: vine.string().minLength(8).maxLength(15).confirmed(),
})

export const createUserValidator = vine.compile(vine.array(userSchema))
