This is a digital tachistoscope and at the same time my MERN playground.

If you don't know what is tachistoscope, read article [You're Not as Smart as You Could Be](http://www.panshin.com/critics/Renshaw/notassmart/notassmart1.html)

Demo: https://recognizzze.web.app/ (Please don't use your real passwords)

It uses:

[MongoDB Cloud](https://www.mongodb.com/cloud) as DB

[Heroku](https://www.heroku.com/) as NodeJS hosting

[Firebase](https://firebase.google.com) as Web hosting

#### Client
* Only React function components with Hooks (no classes)
* TypeScript
* FP-TS Option (aka Scala Option) to gracefully handle null and undefined
* Only immutability-helper
* react-beautiful-dnd
* Redux to handle state
* Optimistic updates
* Webpack DllPlugin to improve build time performance
* Entities can be transfered from server code to client code without any modifications

#### Server
* TypeScript
* Express for Passport.js and WS for the rest
* Basic JSON Web Token for sessionless auth
* Also FP-TS Option