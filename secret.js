module.exports = {
    cookieSecret: 'abc123$',
    sessionSecret:{ secret: 'ses123$',
    resave: true,
    maxAge: 24*60*60*1000,
    saveUninitialized: true},
    googleClientID: '465227681164-g1ictgjulos3k6on8g0c067crsjgva0t.apps.googleusercontent.com',
    googleClientSecret: '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',
    mongo:{
        dev:{
            conn:"mongodb://localhost:27017/final"
        },
        product:{
            conn:"mongodb://localhost:27017/final"
        },  
   }
}
