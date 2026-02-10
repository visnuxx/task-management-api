const request=require('supertest')
const app=require('../app')
const { pool , checkConnection}=require('../db')

describe("auth tests",()=>{

    test ('login success',async()=>{
        const res=await request(app)
        .post('/api/login')
        .send({
            email:'tony@gmail.com',
            password:'string'
        })
        expect(res.statusCode).toBe(200)

    })
    test('login fail with wrong password',async()=>{
         const res=await request(app)
        .post('/api/login')
        .send({
            email:'tony@gmail.com',
            password:'wrong'
        })
        expect(res.statusCode).toBe(401)
    })
    test('login with wrong email or password',async()=>{
        const res=await request(app)
        .post('/api/login')
        .send({
            email:'dumagoli@gamil.com',
            password:'dummy'
        })
        expect(res.statusCode).toBe(404)
    })
   

})

  afterAll(async()=>{
    await pool.end();
});
