const zod =require('zod');

//all validation schemas in one place 

const signupSchema=zod.object({
    username:zod.string().email(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string().min(6)
});

const signinSchema=zod.object({
    username:zod.string().email(),
    password:zod.string().min(6)
});

const updateUserSchema=zod.object({
    password:zod.string().min(6).optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional()
})

module.exports={
    signupSchema,
    signinSchema,
    updateUserSchema
}