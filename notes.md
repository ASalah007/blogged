# blogged application 

# project beginning

1. User can log in into their profiles 
2. User can create a blog on the site and type it using **wysiwyg**
3. each user has his own subdomain
4. writer can see for each blog some statistics about the blogs e.g. how many readers finished the blog
5. each blog has comments section where readers can leave comments
6. each blog has like and dislike button
7. each blog must have a subnail and a title
8. readers can go to writers profiles and see their blogs



# 1. User can login into their profiles

- [ ] Use HTTPS: Always use HTTPS to encrypt communication between the client and the server. This ensures that sensitive information, such as user credentials, is protected from interception and unauthorized access.

- [ ] Use token-based authentication: Use token-based authentication, such as JSON Web Tokens (JWT) or OAuth2, to authenticate users. This allows users to authenticate once and receive a token that can be used to authenticate subsequent requests. This reduces the amount of sensitive information that is transmitted over the network and simplifies the authentication process.

- [ ] Use rate limiting: Use rate limiting to limit the number of requests that can be made by a user within a certain time period. This helps prevent denial-of-service attacks and other types of attacks that involve excessive traffic to the server.

- [ ] Implement CORS: Implement Cross-Origin Resource Sharing (CORS) to restrict access to your API to trusted domains. This helps prevent cross-site scripting attacks and other types of attacks that involve injecting malicious scripts into web pages.

- [ ] Use role-based access control: Use role-based access control (RBAC) to restrict access to sensitive resources based on user roles. This ensures that only authorized users can access sensitive information and perform critical actions.

- [ ] Use third-party authentication: Consider using third-party authentication services, such as Google or Facebook, to authenticate users. This simplifies the authentication process and reduces the burden on users to create and remember yet another set of credentials.