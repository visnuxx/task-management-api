let adminToken;
const request=require('supertest')
const app=require('../app')
const { pool , checkConnection}=require('../db')


beforeAll(async()=>{

   const res= await request(app)
    .post('/api/login')
    .send({
        email:'manu@gmail.com',
        password:'123'
    })
    
    adminToken=res.body.token
})
    test('admin can create task',async()=>{
        const res=await request(app)
    .post('/api/admin/create')
    .set('Authorization', `Bearer ${adminToken}`)
    .send({
        title:"ui design",
        user_id:2
    })
    expect(res.status).toBe(201)

})

 test('should fail without tokken',async()=>{
        const res=await request(app)
    .post('/api/admin/create')
    
    .send({
        title:"ui design",
        user_id:2
    })
    expect(res.status).toBe(403)

})

afterAll(async()=>{
    await pool.end();
});

