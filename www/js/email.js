
function sendVoucher(id,name,email,callback){
    var api_key = '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';
  // using SendGrid's Node.js Library - https://github.com/sendgrid/sendgrid-nodejs
  var sendgrid = require("sendgrid")(api_key);

  var text= "Dear " + name + ",\n"
  + "I am Vanessa from StartYourApp, an organization that helps businesses communicate better with their customers.We think we can help you engage your customers much better than Facebook pages and newsletters.\n\n"
  +"What we are proposing is to help you create your own mobile app that helps your business :\n"
  +"- Engage customers at least 3-4 times more than Facebook pages and newsletters\n"
  +"- Gain more insights about the behaviour of your customers \n"
  +"- Update users directly without other noise (e.g posts not related to your brands), anytime of the day\n"
  +"- Engage without extra effort. We integrates the app with your current methods of customer communications \n\n"
  +"Do take a look at the sample prototype of your app that we have created for you in this link"
  +"http://fb-fan.herokuapp.com/#/demo/"+id+"\n"
  +"Please feel free to play around with it.\n\n"
  +"If you'd like to learn more about this prototype or you app, don't hesitate to ask me. You can also visit our website: the link is in my signature.\n"
  +"What do you think? Do you want to give it a try?\n\n"
  +"Kindest regards,\n"
  +"Vanessa Yeoh\n"
  +"Account manager\n"
  +"www.startyourapp.org\n";

  var html="";

  var email     = new sendgrid.Email({
    to:       email,
    from:     'vanessa@meqo.com',
    fromname: 'StartyourApp',
    subject:  'Start your own app'+name,
    text:     text,
    html:     html,
    date:     new Date();
  });
  sendgrid.send(email, function(err, json) {
    if (err) { return console.error(err); }
    console.log(json);
  });
}
