Endpoints: 
[POST] /api/signup:
Input: 
    {
        "name":"Arif",
        "email": "mdarif1@gmail.com",
        "password":"1234"
    }
Output:
    {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMWIyYTBhZTJjNTg2MzQxMzhjYzM0MyIsImVtYWlsIjoibWRhcmlmMUBnbWFpbC5jb20iLCJyb2xlIjoibWVtYmVyIiwibmFtZSI6IkFyaWYiLCJpYXQiOjE3ODAxNjUxMzAsImV4cCI6MTc4MDE2NjkzMH0.OSSGnmLJT5-3CSz0kYa1qHkuC9fkTJCoPdrlF_XRaoA",
        "user": {
            "id": "6a1b2a0ae2c58634138cc343",
            "name": "Arif",
            "email": "mdarif1@gmail.com",
            "role": "member"
        }
    }
    // Stores the refreshToken in the http-cookie

[POST] /api/login:
Input: 
    {
        "email": "mdarif1@gmail.com",
        "password":"1234"
    }
Output:
    {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMWIyYTBhZTJjNTg2MzQxMzhjYzM0MyIsImVtYWlsIjoibWRhcmlmMUBnbWFpbC5jb20iLCJyb2xlIjoibWVtYmVyIiwibmFtZSI6IkFyaWYiLCJpYXQiOjE3ODAxNjUyMDAsImV4cCI6MTc4MDE2NzAwMH0.78Bc-CxNlq34Z2tvSl1tQu0KeznVyQwJpX4YY1AE_HU",
        "user": {
            "id": "6a1b2a0ae2c58634138cc343",
            "name": "Arif",
            "email": "mdarif1@gmail.com",
            "role": "member"
        }
    }
    //Stores the refresh-token in the http-cookie

[POST] /api/refresh-token:
When the access token returns status code 4XX then call this endpoint from the client
Response:
    {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1kYXJpZjFAZ21haWwuY29tIiwibmFtZSI6IkFyaWYiLCJyb2xlIjoibWVtYmVyIiwiaWF0IjoxNzgwMTY1Mjc2LCJleHAiOjE3ODAxNjcwNzZ9.zTbaxD82OFaKKKpn3-BvgS8b3gJPT-x7y1WpvJvMOmA"
    }

Works in the following way:
    Checks if refresh-token exists in the cookie -> verifies using jwt.verify() -> Creates a access-token 


[GET] /api/all-users:
This endpoint will only work from admin login and returns all the users

[PATCH] /api/users/:id/role:
Every default role will be 'member' and admin can promote them to manager by using the above endpoint and replace the :id with real id

Note: To give only admin access authorize('admin') has been used


// WOrking on project routes -> 
problems: same title should not exist 
          manager should also have the CRUD of projects
