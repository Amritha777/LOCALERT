
const express=require('express');
const app=express();
const bp=require('body-parser');
const sql=require('mysql');

let config={
  "host":'localhost',
  "user":'amritha',
  "password":'YOUR_PASSWORD',
  "database":'localert'
}

let connection=sql.createConnection(config);
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('YOUR_API_KEY');

app.use(bp.urlencoded({extended:true}));
app.use(bp.json());

app.use('/',express.static('public'));

app.listen('9000',function(){
  console.log("server is running at port 9000");
  connection.connect();
  console.log("sql connection has been made ");
  console.log("mailsending commands have been commented out");
})

// app.get('/',function(req,res){
//   res.sendStatus(200);
// })

// app.get('/',function(req,res){
//   console.log("atleast the server is runneing safe");
//   res.send("the server is set to start");
// })

app.post('/signup',function(req,res){
  console.log("we are getting the form data ");
  console.log("req.body received");
  let u_f_n=req.body.user_first_name;
  let u_l_n=req.body.user_last_name;
  let u_e=req.body.user_email;
  let u_p=req.body.user_phone;
  let c1_e=req.body.c1_email;
  let c1_p=req.body.c1_phone;
  let c2_e=req.body.c2_email;
  let c2_p=req.body.c2_phone;
  console.log(u_f_n, u_l_n,u_e,u_p,c1_e,c1_p,c2_e,c2_p);
  let query=`select * from user_info where u_e="${req.body.user_email}"`;

  connection.query(query,function(err,data){
    if(err) throw err;
    if(data==null){
        console.log("doesnot alreadyexist in database");
        console.log("anyways writing into database");
         query=`insert into user_info(u_f_n,u_l_n,u_e,u_p,c1_e,c1_p,c2_e,c2_p) values("${u_f_n}","${u_l_n}","${u_e}",${u_p},"${c1_e}",${c1_p},"${c2_e}",${c2_p})`;
          connection.query(query, function(err,data){
            if(err) throw err;
            console.log(data);
          });
       }


    else{
      query=`delete from user_info where u_e="${u_e}"`;
      connection.query(query,function(err,data){
        console.log("already exisited in database so deleted");
        if(err) throw err;
        console.log(data);
        console.log("anyways writing into database");
         query=`insert into user_info(u_f_n,u_l_n,u_e,u_p,c1_e,c1_p,c2_e,c2_p) values("${u_f_n}","${u_l_n}","${u_e}",${u_p},"${c1_e}",${c1_p},"${c2_e}",${c2_p})`;
          connection.query(query, function(err,data){
            if(err) throw err;
            console.log(data);
          })
      });

    }
  })


  res.redirect('/');

})


app.post('/redsafety',function(req,res){
  console.log("reachded here in redvelvet");
  console.log(req.body.mail);
  let u=req.body.mail;
  let t=req.body.text;
  let query="select * from trusted";
  connection.query(query, function(err,data){
    if(err) throw err;
    let s1=(data[0].t_e);
    let s2=(data[2].t_e);
    let s3=(data[3].t_e);
    let s4=(data[1].t_e);
    let s5=(data[4].t_e);
    let s6=(data[5].t_e);
    const msg1t = {
      to: s1,
      from: req.body.mail,
      subject: 'CALL FOR HELP',
      text: req.body.text,
      html: `<strong>${req.body.text}</strong>`,
    };
    const msg2t = {
      to: s1,
      from: req.body.mail,
      subject: 'CALL FOR HELP',
      text: req.body.text,
      html: `<strong>${req.body.text}</strong>`,
    };
    const msg3t = {
      to: s1,
      from: req.body.mail,
      subject: 'CALL FOR HELP',
      text: req.body.text,
      html: `<strong>${req.body.text}</strong>`,
    };
    const msg4t = {
      to: s1,
      from: req.body.mail,
      subject: 'CALL FOR HELP',
      text: req.body.text,
      html: `<strong>${req.body.text}</strong>`,
    };
    const msg5t = {
      to: s1,
      from: req.body.mail,
      subject: 'CALL FOR HELP',
      text: req.body.text,
      html: `<strong>${req.body.text}</strong>`,
    };
    const msg6t = {
      to: s1,
      from: req.body.mail,
      subject: 'CALL FOR HELP',
      text: req.body.text,
      html: `<strong>${req.body.text}</strong>`,
    };
    console.log("all the six messages have been prepared");

    //  sgMail.send(msg1t);
    //  sgMail.send(msg2t);
    //  sgMail.send(msg3t);
    //  sgMail.send(msg4t);
    //  sgMail.send(msg5t);
    //  sgMail.send(msg6t);

    console.log("emails will be sent");

  })

  res.sendStatus(200);
})




app.post('/safee',function(req,res){
//  console.log(req.body);
  console.log("email id is :", req.body.mail);
  console.log("email content is :", req.body.text);

  let query=`select * from user_info where u_e="${req.body.mail}"`;

  connection.query(query,function(err,data){
    if(err) throw err;
    console.log(data);
    var s1=data[0].c1_e;
    var s2=data[0].c2_e;
    console.log(s1,s2);

    const msg1g = {
      to: s1,
      from: req.body.mail,
      subject: 'Safe alert',
      text: req.body.text,
      html: `<strong>${req.body.text}</strong>`,
    };
    const msg2g = {
      to: s2,
      from: req.body.mail,
      subject: 'Safe alert',
      text: req.body.text,
      html: `<strong>${req.body.text}</strong>`,
    };
  //  sgMail.send(msg1g);
  //  sgMail.send(msg2g);

  })


  // mail to be commented out
  res.send("We have informed your trusted contacts that you are safe!! Thanks for using LOCALERT");

});




app.post('/orangee',function(req,res){
//  console.log(req.body);
  console.log("email id is :", req.body.mail);
  console.log("email content is :", req.body.text);

  let query=`select * from user_info where u_e="${req.body.mail}"`;

  connection.query(query,function(err,data){
    if(err) throw err;
    console.log(data);
    var s1=data[0].c1_e;
    var s2=data[0].c2_e;
    console.log(s1,s2);

    const msg1o = {
      to: s1,
      from: req.body.mail,
      subject: 'Help alert',
      text: req.body.text,
      html: `<strong>${req.body.text}</strong>`,
    };
    const msg2o = {
      to: s2,
      from: req.body.mail,
      subject: 'Help alert',
      text: req.body.text,
      html: `<strong>${req.body.text}</strong>`,
    };
  //  sgMail.send(msg1o);
  //  sgMail.send(msg2o);

  })


  // mail to be commented out
  res.send("We have informed your trusted contacts that you need help!! Thanks for using LOCALERT");

});

app.post('/rede',function(req,res)
{
  console.log("email id is :", req.body.mail);
  console.log("email content is :", req.body.text);

  let query=`select * from user_info where u_e="${req.body.mail}"`;

  connection.query(query,function(err,data){
    if(err) throw err;
    console.log(data);
    var s1=data[0].c1_e;
    var s2=data[0].c2_e;
    console.log(s1,s2);

    const msg1r = {
      to: s1,
      from: req.body.mail,
      subject: 'DANGER ALERT',
      text: req.body.text,
      html: `<strong>${req.body.text}</strong>`,
    };
    const msg2r = {
      to: s2,
      from: req.body.mail,
      subject: 'DANGER ALERT',
      text: req.body.text,
      html: `<strong>${req.body.text}</strong>`,
    };
  //  sgMail.send(msg1r);
  //  sgMail.send(msg2r);

  })


  // mail to be commented out
  res.send("We have informed your trusted contacts that you are in DANGER!! Thanks for using LOCALERT");

});


app.post('/gethelpline',function(req,res){
  console.log("the email id request is ",req.body.ue);
  let query=`select * from user_info where u_e="${req.body.ue}"`;

  connection.query(query,function(err,data){
    if(err) throw err;
    console.log(data);
    var s1=data[0].c1_e;
    var s2=data[0].c2_e;
    console.log(s1,s2);
    let obj={
      's1':s1,
      's2':s2
    };
    console.log(obj);
    res.send(obj);
})
}
);
